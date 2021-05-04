/*global require, app*/
/*global document: false*/
app.controller('controllerNotification', function ($scope, serviceIpc) {
    "use strict";

    function debug_open(event) {
        if (event && event.altKey && event.shiftKey) {
            serviceIpc.call('window_debug', {});
        }
    }

    function logout() {
        console.log("ovde treba da se ugasi notifikacija");
        serviceIpc.call('change_options');
    }

    function event_start_back(event, content) {
        if (!event) { return; }
        if (!content) { return; }
        console.log("TODO doso mi ovde event! tu treba datu da pokupim");
    }

    function init() {
        $scope.v_notification = {
            handle: {
                debug_open: debug_open,
                logout: logout
            }
        };

        serviceIpc.subscribe($scope, 'start_back', event_start_back);
    }

    init();
    serviceIpc.call('ready', {});
});
