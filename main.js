/*jslint node:true*/
var electron = require('electron'),
    app = electron.app,

    CONFIG = require('./config'),

    main_ipc = require('./lib/main_ipc'),
    main_window = require('./lib/main_window'),
    main_getter = require('./lib/main_getter'),
    main_tray = require('./lib/main_tray'),

    options_params = {
        subreddit: 'FreeGamesOnSteam',
        time: 0
    },
    watch_started = false,
    params;

function ipc_event(event, data) {
    "use strict";
    if (!event) { return; }
    if (!data) { return; }
    if (!data.sender) { return; }

    switch (event) {
    case 'start':
        if (watch_started) { return; }
        if (!data.params) { return; }
        watch_started = true;
        main_getter.startWatch(data.params);
        options_params = data.params;
        break;
    case 'notification_ready':
        main_window.sendEvent('notification_start_back', params);
        break;
    case 'options_ready':
        main_window.sendEvent('options_start_back', {is_active: watch_started, options_params: options_params});
        break;
    case 'stop':
        if (!watch_started) { return; }
        watch_started = false;
        main_getter.stopWatch();
        break;
    case 'go_to_notification':
        if (!data.params) { return; }
        if (!data.params.url) { return; }
        electron.shell.openExternal(data.params.url);
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
