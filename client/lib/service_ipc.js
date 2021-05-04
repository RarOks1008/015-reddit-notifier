/*global require,angular,app*/
app.service('serviceIpc', function ($timeout) {
    "use strict";
    var EVENTS = ['start_back'],
        this_service,
        ipc,
        emit_scopes = {};

    angular.extend(this, {
        initialize: function () {
            if (typeof require === 'function') { ipc = require('electron').ipcRenderer; }
            if (!ipc) { return; }

            EVENTS.forEach(function (event_name) {
                ipc.on(event_name, function (event, data) {
                    if (!event) { return; }
                    this_service.notify(event_name, data);
                });
            });
        },
        call: function (event, params) {
            if (!ipc) { return; }
            if (!event) { return; }
            ipc.send(event, params);
        },
        subscribe: function (scope, event, callback) {
            if (!emit_scopes.hasOwnProperty(event)) {
                emit_scopes[event] = [];
            }
            if (emit_scopes[event].indexOf(scope) < 0) {
                emit_scopes[event].push(scope);
                var handler = scope.$on(event, callback);
                scope.$on('$destroy', function () {
                    handler();
                    var p = emit_scopes[event].indexOf(scope);
                    if (p < 0) { return; }
                    emit_scopes[event].splice(p, 1);
                });
            }
        },
        notify: function (event, arg) {
            if (!emit_scopes.hasOwnProperty(event)) { return; }
            $timeout(function () {
                emit_scopes[event].forEach(function (scope) {
                    scope.$emit(event, arg);
                });
            });
        }
    });
    this_service = this;
    this_service.initialize();
});
