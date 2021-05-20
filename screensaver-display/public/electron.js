// dependencies
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs');
const { exec, execFile } = require('child_process');

// settings files storage path
const storagePath = app.getPath('appData') + '/shared-screensaver';
if (!fs.existsSync(storagePath)) {
	fs.mkdirSync(storagePath);
}

// interfaces
require('./api-components/ipcFileInterface.js'); // file access from React through main Electron window
require('./api-components/redditAPI.js'); // RedditAPI functions that need to run from main process
const authentication = require('./api-components/redirectAuthenticate.js'); // Instagram authentication moved here

// Bool to check --settings parameter
// TODO(CHris): Revert these lines.
// const shouldShowTempSettings = process.argv.includes('--settings');
const shouldShowTempSettings = !process.argv.includes('--preview');

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
			devTools: isDev,
			nodeIntegration: true,

			// This allows us to access window.require("electron"), but according to
			// https://www.electronjs.org/docs/tutorial/context-isolation "every single
			// application" should have contextIsolation enabled for security purposes
			contextIsolation: false
		}
	});

	win.webContents.on('will-navigate', authentication.bind(null, win));

	//win.removeMenu();

	// For Development: Run from localhost (background react server)
	// For Builds: Run from index.html file in build/
	win.loadURL(shouldShowTempSettings ? urlBasis + '#/posts' : urlBasis);

	ipcMain.on('reload-page', (event, args) => {
		win.reload();
	});
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

ipcMain.on('preview-screensaver', (event, args) => {
	if (isDev) {
		console.log('In dev mode, so running yarn command to start preview.');
		exec('yarn electron . --preview');
	}
	else {
		console.log(`In production mode, so using ${app.getPath('exe')} to start a new instance.`);
		execFile(app.getPath('exe'), ["--preview"]);
	}
});

ipcMain.on('exit', (event, args) => {
	app.exit();
});
