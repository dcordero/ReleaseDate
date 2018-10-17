'use strict';

const { app, Menu, Tray } = require('electron');
const ontime = require('ontime');
const moment = require('moment');

let tray = null;

function updateDate() {
    const currentDate = new Date();
    const version = moment(currentDate).format('YYww');

    tray = new Tray(`${__dirname}/icon.png`);
    tray.setTitle(` ${version} `);
}

function createWindow () {

    updateDate();

    const contextMenu = Menu.buildFromTemplate([{
        label: 'Quit', click() {
            app.quit();
        }
    }]);

    ontime({
        cycle: 'Monday 00:00:00'
    }, function (ot) {
        updateDate();
        ot.done();
        return;
    });

    tray.setToolTip('ReleaseDate');
    tray.setContextMenu(contextMenu);
}

app.dock.hide();
app.on('ready', createWindow);

app.setLoginItemSettings({
    openAtLogin: true,
    openAsHidden: true
});
