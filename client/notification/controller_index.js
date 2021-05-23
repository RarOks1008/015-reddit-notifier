/*global require, app*/
/*global document: false*/
app.controller('controllerNotification', function ($scope, $window, serviceIpc) {
    "use strict";

    function quit() {
        $window.close();
    }

    function event_notification_start_back(event, content) {
        if (!event) { return; }
        if (!content) { return; }
        console.log(content);
        console.log("TODO doso mi ovde event! tu treba datu da pokupim");
    }

    function init() {
        $scope.v_notification = {
            handle: {
                quit: quit
            }
        };

        serviceIpc.subscribe($scope, 'notification_start_back', event_notification_start_back);
    }

    init();
    serviceIpc.call('notification_ready', {});
});
