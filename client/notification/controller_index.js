/*global require, app*/
/*global document: false*/
app.controller('controllerNotification', function ($scope, $window, serviceIpc) {
    "use strict";

    function quit() {
        $window.close();
    }

    function go_to_notification() {
        serviceIpc.call('go_to_notification', {url: $scope.v_notification.notification_params.url});
        $window.close();
    }

    function event_notification_start_back(event, content) {
        if (!event) { return; }
        if (!content) { return; }
        $scope.v_notification.notification_params.flair = content.flair;
        $scope.v_notification.notification_params.image = content.image;
        $scope.v_notification.notification_params.title = content.title;
        $scope.v_notification.notification_params.url = content.url;
    }

    function init() {
        $scope.v_notification = {
            notification_params: {
                flair: '',
                image: '',
                title: '',
                url: ''
            },
            handle: {
                quit: quit,
                go_to_notification: go_to_notification
            }
        };

        serviceIpc.subscribe($scope, 'notification_start_back', event_notification_start_back);
    }

    init();
    serviceIpc.call('notification_ready', {});
});
