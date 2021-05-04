/*jslint node:true*/
var CONFIG = {
    WINDOW: {
        OPTIONS: {
            width: 550,
            height: 385,

            resizable: false,

            backgroundColor: '#353839',

            autoHideMenuBar: true,
            skipTaskbar: false,

            frame: false,
            titleBarStyle: 'customButtonsOnHover',
            minimizable: false,
            fullscreenable: false,
            maximizable: false,
            title: 'Main Options',
            window_name: 'options'
        },
        NOTIFICATION: {
            width: 1024,
            height: 500,

            resizable: false,

            backgroundColor: '#353839',

            autoHideMenuBar: true,
            skipTaskbar: false,

            frame: false,
            titleBarStyle: 'customButtonsOnHover',
            minimizable: false,
            fullscreenable: false,
            maximizable: false,
            title: 'Notification',
            window_name: 'notification'
        }
    }
};

module.exports = CONFIG;
