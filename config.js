/*jslint node:true*/
var CONFIG = {
    WINDOW: {
        OPTIONS: {
            width: 550,
            height: 350,

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
            width: 400,
            height: 50,

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
