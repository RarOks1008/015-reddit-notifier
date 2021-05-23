/*jslint node:true*/
var electron = require('electron'),
    app = electron.app,

    CONFIG = require('./config'),

    main_ipc = require('./lib/main_ipc'),
    main_window = require('./lib/main_window'),
    main_getter = require('./lib/main_getter'),
    params;

function ipc_event(event, data) {
    "use strict";
    if (!event) { return; }
    if (!data) { return; }
    if (!data.sender) { return; }

    switch (event) {
    case 'quit':
        app.quit();
        break;
    case 'start':
        main_getter.startWatch(data.params);
        main_window.createWindow(CONFIG.WINDOW.NOTIFICATION);
        params = data.params;
        break;
    case 'ready':
        main_window.sendEvent('start_back', params);
        break;
    case 'change_options':
        main_window.createWindow(CONFIG.WINDOW.OPTIONS);
        main_window.closeWindow(CONFIG.WINDOW.NOTIFICATION.window_name);
        params.program = '';
        params.language = '';
        break;
    }
}
function init() {
    "use strict";

    main_ipc.start(ipc_event);
    main_window.createWindow(CONFIG.WINDOW.OPTIONS);
}

app.on('ready', init);
