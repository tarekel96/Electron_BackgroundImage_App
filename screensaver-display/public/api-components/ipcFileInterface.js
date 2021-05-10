const { app, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const urlBasis = isDev ? 'http://localhost:3000/' : `file://${path.join(__dirname, '../build/index.html')}`;

// settings files storage path
const storagePath = app.getPath('appData') + '/shared-screensaver';
if (!fs.existsSync(storagePath)) {
	fs.mkdirSync(storagePath);
}

// Used to read the login token for Instagram
ipcMain.on('ig-bd-read-token', (event, arg) => {
	const tokenFilePath = storagePath + '/IGBasicDisplayLongLivedToken';

	try {
		event.returnValue = fs.readFileSync(tokenFilePath, 'utf8');
	} catch (err) {
		event.returnValue = null;
	}
});

// Used to save settings from the UserSettings tab
ipcMain.on('save-settings', (event, args) => {
	console.log(args);
	fs.writeFileSync(storagePath + '/settings.json', args);
});

// Used to read settings when displaying the screensaver
ipcMain.on('read-settings-info', (event, arg) => {
	try {
		const settingsPath = storagePath + '/settings.json';

		event.returnValue = require(settingsPath);
	} catch (err) {
		event.returnValue = null;
	}
});

// Used to save the list of selected images to display while in the Instagram tab
ipcMain.on('selected-images', (event, args) => {
	if (args !== undefined) {
		const selectedImagesPath = storagePath + '/selectedimages.json';
		fs.writeFileSync(selectedImagesPath, args);
	}
	else {
		console.log('args is undefined');
	}
});

// Used to read the list of selected images to display when running the screensaver
ipcMain.on('read-selected-images', (event, arg) => {
	try {
		const selectedImagesPath = storagePath + '/selectedimages.json';

		event.returnValue = require(selectedImagesPath);
	} catch (err) {
		event.returnValue = null;
	}
});

ipcMain.on('preview-screensaver', (event, args) => {
	if (isDev) {
		exec('yarn electron .');
	}
	else {
		exec(`${app.getPath('exe')}`);
	}
});

// Obtains the url basis for use in double-redirects in React
ipcMain.on('get-url-basis', (event, args) => {
	event.returnValue = urlBasis;
});

ipcMain.on('delete-ig-files', (event, args) => {
	function deleteIfExists(path) {
		if (fs.existsSync(path)) {
			fs.rmSync(path);
			console.log(`Deleted ${path}!`);
		} else {
			console.log(`Did not delete ${path}, as it does not exist.`);
		}
	}

	deleteIfExists(storagePath + '/IGBasicDisplayLongLivedToken');
	deleteIfExists(storagePath + '/selectedimages.json');

	event.returnValue = null;
});