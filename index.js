const { app, BrowserWindow } = require('electron');
const path = require('node:path');

if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1366,
        height: 768,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            experimentalFeatures: true,
            nodeIntegrationInWorker: true,
            nodeIntegration: true
        },
        icon: "icons/og.png"
    });

    mainWindow.setMenu(null)
    mainWindow.loadFile(path.join(__dirname, 'src/index.html')).then();
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
