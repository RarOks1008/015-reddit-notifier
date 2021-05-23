/*global window, app*/
app.controller('controllerOptions', function ($scope, $window, serviceIpc) {
    "use strict";

    function start() {
        if ($scope.v_options.is_active) { return; }
        if (!$scope.v_options.options.subreddit) { return; }
        serviceIpc.call('start', {subreddit: $scope.v_options.options.subreddit, time: $scope.v_options.options.time});
        $window.close();
    }

    function stop() {
        console.log("ovde stopirati funkciju");
        console.log("i ovde last_post izbrisati opet iz main gettera");
    }

    function quit() {
        $window.close();
    }

    function event_options_start_back(event, content) {
        if (!event) { return; }
        if (!content) { return; }
        if (!content.options_params) { return; }
        $scope.v_options.is_active = content.is_active;
        $scope.v_options.options.subreddit = content.options_params.subreddit;
        $scope.v_options.options.time = content.options_params.time;
    }

    function init() {
        $scope.v_options = {
            is_active: false,
            options: {
                subreddit: '',
                time: 0
            },
            handle: {
                start: start,
                quit: quit,
                stop: stop
            }
        };

        serviceIpc.subscribe($scope, 'options_start_back', event_options_start_back);
    }
    init();
    serviceIpc.call('options_ready', {});
});
