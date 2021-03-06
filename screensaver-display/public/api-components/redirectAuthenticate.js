// dependencies
const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch').default;
const fs = require('fs');
const https = require('https');

// settings files storage path
const storagePath = app.getPath('appData') + '/shared-screensaver';
if (!fs.existsSync(storagePath)) {
	fs.mkdirSync(storagePath);
}

// APP SECRET
const APP_SECRET = 'a7a0947d0367a41024f825989bf65049';

// NOTE(Chris): This is constructed slightly differently from the urlBasis in
// electron.js, since this file (redirectAuthenticate.js) is in a different
// directory than electron.js
const urlBasis = isDev ? 'http://localhost:3000/' : `file://${path.join(__dirname, '../index.html')}`;

function redirectAuthenticate(win, event, newUrl) {
	const API_AUTH_PATH = 'https://localhost:3000/auth/';
	const PAGE_AUTH_PATH = urlBasis + '#/posts';

	// console.log("redirect newUrL: " + newUrl);

	if (newUrl.startsWith(API_AUTH_PATH)) {
		win.loadURL(urlBasis + '#/loading'); // Load this while we asynchronously exchange for the short-lived user token

		const fetchTokens = async () => {
			// console.log(`newUrl: ${newUrl}`);
			const urlParams = new URLSearchParams(new URL(newUrl).search);
			// console.log(`urlParams: ${urlParams.entries()}`);
			const authorizationCode = urlParams.get('code');

			/// Obtain short-lived token

			// The Instagram API expects the POST request for a short-lived token to
			// have its body be form data (rather than json). So we use FormData here
			// to populate the request body.
			// See https://developers.facebook.com/docs/instagram-basic-display-api/guides/getting-access-tokens-and-permissions#step-2--exchange-the-code-for-a-token
			const formData = new FormData();
			formData.append('client_id', '765093417767855');
			formData.append('client_secret', APP_SECRET);
			formData.append('grant_type', 'authorization_code');
			formData.append('redirect_uri', API_AUTH_PATH);
			formData.append('code', authorizationCode);

			// I tried to use Axios to make this http request, but I couldn't get it to work correctly.
			// As a result, I used node-fetch here. We can probably refactor this to use Axios in the future.
			// Normally fetch would return a Promise, which allows us to start an asychronous
			// operation and do something with its result.
			// We use the async/await keywords to avoid the ugly (and constantly-nesting)
			// syntax of promise.then().then().then()
			// Using async/await also means that we don't directly interact with a Promise,
			// instead storing a Resopnse in the response variable.
			// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
			// and https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
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

			console.log('PAGE_AUTH_PATH: ' + PAGE_AUTH_PATH);
			win.loadURL(PAGE_AUTH_PATH);
		};

		fetchTokens(); // Asynchronous
	}
}

module.exports = redirectAuthenticate;