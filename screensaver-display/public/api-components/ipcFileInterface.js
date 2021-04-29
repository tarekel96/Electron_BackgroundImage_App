const { app, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const { exec } = require('child_process');
const fs = require('fs');

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

/*
 	Comment from Ayden:

 What do these do? Seems like very similar functionality to saving selected images.
 We do not want to save the posts that load in the settings app to display in the
 slideshow, because the point is to have this dynamic so that new images load into
 the slideshow without the user having to open the settings app and re-import their
 photos from instagram
*/
// RESPONSE(Chris): These two channels are likely unnecessary, now that we're using
// the selected-images and read-selected-images channels
ipcMain.on('save-posts-info', (event, arg) => {
	const latestPosts = arg;
	const postsInfoPath = storagePath + '/IGBasicPostsInfo.json';

	fs.writeFileSync(postsInfoPath, JSON.stringify(latestPosts));
});

ipcMain.on('read-posts-info', (event, arg) => {
	try {
		const postsInfoPath = storagePath + '/IGBasicPostsInfo.json';

		event.returnValue = require(postsInfoPath);
	} catch (err) {
		event.returnValue = null;
	}
});


// Used to save settings from the UserSettings tab
ipcMain.on('save-settings', (event, args) => {
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
    exec("yarn electron .");
  } else {
    exec(`${app.getPath('exe')}`);
  }
});