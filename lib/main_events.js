/*jslint node:true*/
 var main_events = (function () {
    "use strict";

    return {
        expand: function (destination) {
            if ((typeof destination !== 'object') && (typeof destination !== 'function')) { return destination; }
            destination.main_events = {};
            destination.when = function (action, callback) {
                if (!destination.main_events[action]) {
                    destination.main_events[action] = [];
                }
                destination.main_events[action].push(callback);
                return destination;
            };
            destination.emit = function (action, data) {
                if (!destination.main_events[action]) { return; }
                if (destination.main_events[action].length === 0) { return; }
                destination.main_events[action].forEach(function (cb) {
                    setTimeout(function () { cb(data); }, 100);
                });
            };
            return destination;
        }
    };
}());
module.exports = main_events;