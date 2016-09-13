'use strict';

const electron = require('electron');

const { app, BrowserWindow } = electron;

const ipcPromise = require('../ipc-promise');

let mainWindow;

ipcPromise.on('to-main-from-renderer', function(params) {
  return new Promise(function(resolve, reject) {
    if (params.value === 'main') {
      resolve({ id: 42 });
    } else {
      reject(new Error('to-main-from-renderer'));
    }
  });
});

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    show: true,
  });
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});
