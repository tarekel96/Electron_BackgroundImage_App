const installExtension = require('electron-devtools-installer');
const { REACT_DEVELOPER_TOOLS } = installExtension;
const fs = require('fs');

const { app, BrowserWindow, ipcMain } = require('electron');
const storagePath = app.getPath('appData') + '/shared-screensaver';

if (!fs.existsSync(storagePath)) {
	fs.mkdirSync(storagePath);
}

console.log('STORAGE PATH');
console.log(storagePath);
ipcMain.on('save-settings', (event, args) => {
	fs.writeFileSync(storagePath + '/settings.json', args);
});

const path = require('path');
const url = require('url');

let mainWindow;

app.whenReady().then(() => {
	installExtension(REACT_DEVELOPER_TOOLS)
		.then((name) => console.log(`Added Extension:  ${name}`))
		.catch((err) => console.log('An error occurred: ', err));
});

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	});

	mainWindow.loadURL(
		process.env.ELECTRON_START_URL ||
			url.format({
				pathname: path.join(__dirname, '/../public/index.html'),
				protocol: 'file:',
				slashes: true
			})
	);

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});
