/*jslint node:true*/
var main_window = (function () {
    "use strict";
    var electron = require('electron'),
        main_ipc = require('./main_ipc'),

        path = require('path'),
        app_dir = path.dirname(module.filename),
        windows = {};

    function createWindow(window_options, program) {
        var win,
            display = electron.screen.getDisplayNearestPoint(electron.screen.getCursorScreenPoint());

        window_options = JSON.parse(JSON.stringify(window_options));

        window_options.icon = path.join(app_dir, '..', 'client', 'themes', 'default', 'icons', 'app.ico');


        if (!window_options) { return null; }
        if (!window_options.window_name) { return null; }

        if (!display) { return; }

        window_options.x = Math.floor(display.workArea.x + (display.workArea.width - window_options.width) / 2);
        window_options.y = Math.floor(display.workArea.y + (display.workArea.height - window_options.height) / 2);

        window_options.webPreferences = { nodeIntegration: true };

        win = new electron.BrowserWindow(window_options);
        win.setBounds({x: window_options.x, y: window_options.y, width: window_options.width, height: window_options.height});

        win.loadURL(`file://${__dirname}/../client/${window_options.window_name}/index.html`);

        windows[window_options.window_name] = win;

        win.on('closed', function () {
            delete windows[window_options.window_name];
        });

        return win;
    }

    function closeWindow(name) {
        windows[name].close();
    }

    return {
        createWindow: function (window_options, program) {
            return createWindow(window_options, program);
        },

        sendEvent: function (event, data) {
            Object.keys(windows).forEach(function (name) {
                main_ipc.send(windows[name], event, data);
            });
        },

        closeWindow: function (window_name) {
            closeWindow(window_name);
        }
    };
}());

module.exports = main_window;
