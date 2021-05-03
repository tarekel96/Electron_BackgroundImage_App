
// dependencies
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs');

// settings files storage path
const storagePath = app.getPath('appData') + '/shared-screensaver';
if (!fs.existsSync(storagePath)) {
	fs.mkdirSync(storagePath);
}

// interfaces
require('./api-components/ipcFileInterface.js'); // file access from React through main Electron window
const authentication = require('./api-components/redirectAuthenticate.js'); 	// Instagram authentication moved here

// Bool to check --settings parameter
const shouldShowTempSettings = process.argv.includes('--settings');

// Where does Electron listen? Development mode: local host, Build: index.html
const urlBasis = isDev ? 'http://localhost:3000/' : `file://${path.join(__dirname, '../build/index.html')}`;


function createWindow() {
	const win = new BrowserWindow({
		width: 1366,
		height: 768,
		minWidth: 1200,
		minHeight: 600,
		// frame: false,
		fullscreen: !shouldShowTempSettings,
		icon: 'icon.png',
		webPreferences: {
			nodeIntegration: true,

			// This allows us to access window.require("electron"), but according to
			// https://www.electronjs.org/docs/tutorial/context-isolation "every single
			// application" should have contextIsolation enabled for security purposes
			contextIsolation: false
		}
	});

	win.webContents.on('will-navigate', authentication.bind(null, win));

	// For Development: Run from localhost (background react server)
	// For Builds: Run from index.html file in build/
	win.loadURL(shouldShowTempSettings ? urlBasis + '#/settings_home' : urlBasis);
}

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

ipcMain.on('exit', (event, args) => {
	app.exit();
});