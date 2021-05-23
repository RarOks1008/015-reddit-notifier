/*jslint node:true*/
var main_tray = (function () {
    "use strict";
    var electron = require('electron'),

        path = require('path'),
        app_dir = path.dirname(module.filename);

    function start() {
        var tray = new electron.Tray(path.join(app_dir, '..', 'client', 'themes', 'default', 'icons', 'app.ico')),
            contextMenu = electron.Menu.buildFromTemplate([
                { label: 'Open Options', click: openOptionsClick },
                { label: 'Quit Application', click: quitApplicationClick }
            ]);
        tray.setToolTip('Reddit Notifier');
        tray.on('double-click', openOptionsClick);
        tray.setContextMenu(contextMenu);
    }

    function openOptionsClick() {
        main_tray.emit('open_options', {});
    }

    function quitApplicationClick() {
        main_tray.emit('quit_application', {});
    }

    return {
        start: function () {
            start();
        },
    };
}());

module.exports = require('./main_events').expand(main_tray);
