/*global window, app*/
app.controller('controllerOptions', function ($scope, $window, serviceIpc) {
    "use strict";

    function start() {
        serviceIpc.call('start', {});
        $window.close();
    }

    function stop() {
        console.log("ovde stopirati funkciju");
    }

    function quit() {
        serviceIpc.call('quit');
    }

    function init() {
        $scope.v_options = {
            is_active: false,
            options: {
                subreddit: 'FreeGamesOnSteam',
                time: 0
            },
            handle: {
                start: start,
                quit: quit,
                stop: stop
            }
        };
    }
    init();
});
