/*jslint node:true*/
var main_tray = (function () {
    "use strict";
    var electron = require('electron'),

        path = require('path'),
        tray_icon,
        tray,
        app_dir = path.dirname(module.filename);

    function start() {
        var contextMenu = electron.Menu.buildFromTemplate([
            { label: 'Open Options', click: openOptionsClick },
            { label: 'Quit Application', click: quitApplicationClick }
        ]);
        tray_icon = path.join(app_dir, '..', 'client', 'themes', 'default', 'icons', 'app.ico');
        tray = new electron.Tray(tray_icon);
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
