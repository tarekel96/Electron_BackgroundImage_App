const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const FormData = require('form-data');
const fetch = require('node-fetch').default;
const fs = require('fs');
const https = require('https');

const shouldShowTempSettings = process.argv.includes('--settings');
const urlBasis = isDev ? 'http://localhost:3000/' : `file://${path.join(__dirname, '../build/index.html')}`;

const storagePath = app.getPath('appData') + '/shared-screensaver';

const APP_SECRET = 'a7a0947d0367a41024f825989bf65049';

if (!fs.existsSync(storagePath)) {
	fs.mkdirSync(storagePath);
}

function createWindow() {
	const win = new BrowserWindow({
		width: 1366,
		height: 768,
		// frame: false,
		fullscreen: !shouldShowTempSettings,
		webPreferences: {
			nodeIntegration: true,

			// This allows us to access window.require("electron"), but according to
			// https://www.electronjs.org/docs/tutorial/context-isolation "every single
			// application" should have contextIsolation enabled for security purposes
			contextIsolation: false
		}
	});

	win.webContents.on('will-navigate', redirectAuthenticate.bind(null, win));

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

ipcMain.on('download', (event, arg) => {
	const { url } = arg;

	console.log('Downloading an image!');

	const file = fs.createWriteStream('image.jpg');
	https.get(url, (dlResponse) => {
		dlResponse.pipe(file);
	});
});

ipcMain.on('ig-bd-read-token', (event, arg) => {
	const tokenFilePath = storagePath + '/IGBasicDisplayLongLivedToken';

	try {
		event.returnValue = fs.readFileSync(tokenFilePath, 'utf8');
	} catch (err) {
		event.returnValue = null;
	}
});

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

ipcMain.on('save-settings', (event, args) => {
	fs.writeFileSync(storagePath + '/settings.json', args);
});

function redirectAuthenticate(win, event, newUrl) {
	const API_AUTH_PATH = 'https://localhost:3000/auth/';
	const PAGE_AUTH_PATH = urlBasis + '#/auth';

	// console.log("redirect newUrL: " + newUrl);

	if (newUrl.startsWith(API_AUTH_PATH)) {
		win.loadURL('https://en.wikipedia.org/wiki/Main_Page'); // Load this while we asynchronously exchange for the short-lived user token

		const fetchTokens = async () => {
			// console.log(`newUrl: ${newUrl}`);
			const urlParams = new URLSearchParams(new URL(newUrl).search);
			// console.log(`urlParams: ${urlParams.entries()}`);
			const authorizationCode = urlParams.get('code');

			/// Obtain short-lived token
			const formData = new FormData();
			formData.append('client_id', '765093417767855');
			formData.append('client_secret', APP_SECRET);
			formData.append('grant_type', 'authorization_code');
			formData.append('redirect_uri', API_AUTH_PATH);
			formData.append('code', authorizationCode);

			const response = await fetch('https://api.instagram.com/oauth/access_token', {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Access-Control-Allow-Origin': '*', // TODO(Chris): Unsafe, should change later
					Origin: 'https://localhost:3000'
				},
				body: formData
			});

			if (!response.ok) {
				console.log("There's been a fetch error. Status code: " + response.status);
				console.log('Status text: ' + response.statusText);
				const responseText = await response.text();
				console.log('Response text: ' + responseText);

				// response.status(500);
				return;
			}

			const slData = await response.json();
			console.log(JSON.stringify(slData));
			// console.log(`Short-lived token from Electron: ${slData.access_token}`);

			/// Exchange short-lived token for long-lived token
			const llResponse = await fetch(
				`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${APP_SECRET}&access_token=${slData.access_token}`,
				{
					method: 'GET'
				}
			);

			if (!llResponse.ok) {
				console.log("There's been a fetch error. Status code: " + llResponse.status);
				console.log('Status text: ' + llResponse.statusText);
				const llResponseText = await llResponse.text();
				console.log('Response text: ' + llResponseText);

				// res.status(500);
				return;
			}

			const llData = await llResponse.json();
			// console.log(`Long-lived token from Electron: ${llData.access_token}`);

			/// Store long-lived token in the file system
			const tokenFilePath = storagePath + '/IGBasicDisplayLongLivedToken';
			fs.writeFileSync(tokenFilePath, llData.access_token);

			/// Redirect to React auth page, sending the long-lived token along
			console.log(`Tried to navigate to ${API_AUTH_PATH}, so redirecting...`);

			const redirectUrl = new URL(PAGE_AUTH_PATH);
			redirectUrl.searchParams.append('code', authorizationCode);
			redirectUrl.searchParams.append('ll_token', llData.access_token);
			// console.log(`code: ${authorizationCode}`);
			console.log('redirectUrl: ' + redirectUrl);

			win.loadURL(redirectUrl.href);
		};

		fetchTokens(); // Asynchronous
	}
}
