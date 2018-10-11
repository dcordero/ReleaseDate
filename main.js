'use strict';

const { app, Menu, Tray } = require('electron');
const moment = require('moment');

let tray = null;

function createWindow () {

    const currentDate = new Date();
    const version = moment(currentDate).format('YYww');

    tray = new Tray(`${__dirname}/icon.png`);
    tray.setTitle(` ${version} `);

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Quit', click() {
                app.quit();
            }
        }
    ]);

    tray.setToolTip('This is my application.');
    tray.setContextMenu(contextMenu);
}

app.dock.hide();
app.on('ready', createWindow);

app.setLoginItemSettings({
    openAtLogin: true,
    openAsHidden: true
});
