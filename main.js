/*jslint node:true*/
var electron = require('electron'),
    app = electron.app,

    CONFIG = require('./config'),

    main_ipc = require('./lib/main_ipc'),
    main_window = require('./lib/main_window'),
    main_getter = require('./lib/main_getter'),
    main_tray = require('./lib/main_tray'),

    options_params,
    params;

function ipc_event(event, data) {
    "use strict";
    if (!event) { return; }
    if (!data) { return; }
    if (!data.sender) { return; }

    switch (event) {
    case 'start':
        main_getter.startWatch(data.params);
        options_params = data.params;
        break;
    case 'notification_ready':
        main_window.sendEvent('start_back', params);
        break;
    case 'change_options':
        main_window.createWindow(CONFIG.WINDOW.OPTIONS);
        main_window.closeWindow(CONFIG.WINDOW.NOTIFICATION.window_name);
        break;
    }
}
function init() {
    "use strict";

    main_ipc.start(ipc_event);
    main_window.createWindow(CONFIG.WINDOW.OPTIONS);
    main_tray.start();

    main_tray.when('open_options', function() {
        if (main_window.existsWindow('options')) { return; }
        main_window.createWindow(CONFIG.WINDOW.OPTIONS);
    })
    .when('quit_application', function() {
        app.quit();
    });

    main_getter.when('open_notification', function(data) {
        params = data.params;
        main_window.createWindow(CONFIG.WINDOW.NOTIFICATION);
    });
}
function stopClosing() {
    preventDefault();
}

app.on('ready', init);
app.on('window-all-closed', stopClosing);
