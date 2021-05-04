/*global window, app*/
app.controller('controllerOptions', function ($scope, $window, serviceIpc) {
    "use strict";

    function options() {
        serviceIpc.call('start', {});
        $window.close();
    }

    function quit() {
        serviceIpc.call('quit');
    }

    function init() {
        $scope.v_options = {
            options: {
                subreddit: '',
                time: 0
            },
            handle: {
                options: options,
                quit: quit
            }
        };
    }
    init();
});
