const { app, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const fs = require('fs');
const path = require('path');

const urlBasis = isDev ? 'http://localhost:3000/' : `file://${path.join(__dirname, '../build/index.html')}`;

// settings files storage path
const storagePath = app.getPath('appData') + '/shared-screensaver';
if (!fs.existsSync(storagePath)) {
	fs.mkdirSync(storagePath);
}



//
// Settings Files
//

// Used to save settings from the UserSettings tab
ipcMain.on('save-settings', (event, args) => {
	console.log(args);
	fs.writeFileSync(storagePath + '/settings.json', args);
});

// Used to read settings when displaying the screensaver
// WARNING(Chris): This will _write_ a default settings.json to the file system
// if none already exists
ipcMain.on('read-settings-info', (event, arg) => {
	const settingsPath = storagePath + '/settings.json';

	try {
		event.returnValue = require(settingsPath);
	} catch (err) {
		const defaultSettings =
      '{"cycleTime":3000,"source":"ig","transitionType":"fade","imageType":"jpg","showDescription":false,"showUserProfile":false,"localImageFile":""}';

		fs.writeFileSync(settingsPath, defaultSettings);
		const result = require(settingsPath);

		// console.log(result);
		event.returnValue = result;
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



//
// Instagram API
//

// Obtains the url basis for use in double-redirects in React
ipcMain.on('get-url-basis', (event, args) => {
	event.returnValue = urlBasis;
});

// Used to read the login token for Instagram
ipcMain.on('ig-bd-read-token', (event, arg) => {
	const tokenFilePath = storagePath + '/IGBasicDisplayLongLivedToken';

	try {
		event.returnValue = fs.readFileSync(tokenFilePath, 'utf8');
	} catch (err) {
		event.returnValue = null;
	}
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


//
// RedditAPI
//

//saves subreddit data
ipcMain.on('save-subreddits', (event, args) => {
	console.log('Saving subreddits: ' + args);
	if (args !== undefined) {
		const selectedImagesPath = storagePath + '/subreddits.json';
		fs.writeFileSync(selectedImagesPath, args);
	}
	else {
		console.log('args is undefined');
	}
});

// reads subreddit data
ipcMain.on('read-subreddits', (event) => {
	const selectedImagesPath = storagePath + '/subreddits.json';

	try {
		const rawFile = fs.readFileSync(selectedImagesPath);
		console.log('raw subreddits.json: ' + rawFile);
		const result = JSON.parse(rawFile);
		// const result = require(selectedImagesPath);
		console.log('selected subreddits successfully read in: ' + result);

		event.returnValue = result;
	} catch (err) {
		fs.writeFileSync(selectedImagesPath, "[]");

		event.returnValue = [];
	}
});