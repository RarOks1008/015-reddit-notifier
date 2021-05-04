/*global require, app*/
/*global document: false*/
app.controller('controllerNotification', function ($scope, serviceIpc) {
    "use strict";

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
                logout: logout
            }
        };

        serviceIpc.subscribe($scope, 'start_back', event_start_back);
    }

    init();
    serviceIpc.call('ready', {});
});
