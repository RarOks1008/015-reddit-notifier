/*global window, app*/
app.controller('controllerOptions', function ($scope, $window, serviceIpc) {
    "use strict";

    function start() {
        console.log("ako je vec startovano ne treba da se salje opet start");
        serviceIpc.call('start', {subreddit: $scope.v_options.options.subreddit, time: $scope.v_options.options.time});
        $window.close();
    }

    function stop() {
        console.log("ovde stopirati funkciju");
        console.log("i ovde last_post izbrisati opet iz main gettera");
    }

    function quit() {
        console.log("ovde ne treba quit nego da se minimizuje dole");
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
        console.log("na initu treba da se dobiju propertyji koji se vec koriste");
    }
    init();
});
