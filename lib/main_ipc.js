/*jslint node:true*/
var main_ipc = (function () {
    "use strict";

    var EVENTS = ['start', 'notification_ready', 'options_ready', 'stop', 'go_to_notification'],
        on_event,
        ipc = require('electron').ipcMain;

    return {
        start: function (onevent) {
            if (!onevent) { return; }
            on_event = onevent;
            EVENTS.forEach(function (event_name) {
                ipc.on(event_name, function (event, params) {
                    if (!on_event) { return; }
                    on_event(event_name, {params: params, sender: event.sender});
                });
            });
        },
        send: function (receiver, event, data) {
            if (!receiver) { return; }
            if (!event) { return; }
            if (receiver.webContents) { receiver = receiver.webContents; }
            receiver.send(event, data);
        }
    };
}());

module.exports = main_ipc;
