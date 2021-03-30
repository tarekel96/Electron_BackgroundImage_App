const { SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG } = require('constants');
const { app, BrowserWindow, ipcMain } = require('electron');

const { IgApiClient } = require("instagram-private-api");

const fs = require("fs");
const https = require("https");

const path = require('path');
const url = require('url');
const FormData = require("form-data");
const fetch = require("node-fetch").default;

const AUTH_PATH = "https://localhost:3000/auth/";

let mainWindow;

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

	mainWindow.webContents.on("will-navigate", (event, newUrl) => {
		if (newUrl.startsWith(AUTH_PATH)) {
			mainWindow.loadURL("https://en.wikipedia.org/wiki/Main_Page"); // Load this while we asynchronously exchange for the short-lived user token

      const fetchSlToken = async () => {
        // console.log(`newUrl: ${newUrl}`);
        const urlParams = new URLSearchParams(new URL(newUrl).search);
        // console.log(`urlParams: ${urlParams.entries()}`);
        const authorizationCode = urlParams.get("code");

        const formData = new FormData();
        formData.append("client_id", "765093417767855");
        formData.append("client_secret", "a7a0947d0367a41024f825989bf65049");
        formData.append("grant_type", "authorization_code");
        formData.append("redirect_uri", AUTH_PATH);
        formData.append("code", authorizationCode);

        const response = await fetch(
          "https://api.instagram.com/oauth/access_token",
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Access-Control-Allow-Origin": "*", // TODO(Chris): Unsafe, should change later
              Origin: "https://localhost:3000",
            },
            body: formData,
          }
        );

        if (!response.ok) {
          console.log(
            "There's been a fetch error. Status code: " + response.status
          );
          console.log("Status text: " + response.statusText);
          const responseText = await response.text();
          console.log("Response text: " + responseText);

          res.status(500);
          return;
        }

        const data = await response.json();
        console.log(JSON.stringify(data));
        console.log(`Short-lived token from Electron: ${data.access_token}`);

        console.log(`Tried to navigate to ${AUTH_PATH}, so redirecting...`);

				const redirectUrl = app.isPackaged
          ? new URL(
              url.format({
                // FIXME(Chris): Change this to whatever file contains the Auth page
                pathname: path.join(__dirname, "/../public/index.html"),
                protocol: "file:",
                slashes: true,
              })
            )
          : new URL(AUTH_PATH);
        redirectUrl.searchParams.append("code", authorizationCode);
        redirectUrl.searchParams.append("sl_token", data.access_token);
        // console.log(`code: ${authorizationCode}`);
        // console.log(redirectUrl);

        mainWindow.loadURL(redirectUrl.href);
      };

      fetchSlToken(); // Asynchronous
    };
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// Required for Instagram Basic uncertified https://localhost:3000 authentication
app.commandLine.appendSwitch('ignore-certificate-errors', 'true');

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});

ipcMain.on("asynchronous-message", (event, arg) => {
  switch (arg.type) {
    case "DOWNLOAD":
			const { url } = arg;

      console.log("Downloading an image!");

      const file = fs.createWriteStream("image.jpg");
      const request = https.get(url, (dlResponse) => {
        dlResponse.pipe(file);
      });
      break;
  }
});

ipcMain.on("private-api-login", (event, args) => {
  const ig = new IgApiClient();

  ig.state.generateDevice(process.env.IG_USERNAME);

	// console.log(`IG_USERNAME: ${process.env.IG_USERNAME}`);
	// console.log(`IG_PASSWORD: ${process.env.IG_PASSWORD}`);

  (async () => {
    await ig.simulate.preLoginFlow();
    const loggedInUser = await ig.account
      .login(process.env.IG_USERNAME, process.env.IG_PASSWORD)
      .catch((e) => {
        console.log(e);
      });

    const userFeed = ig.feed.user(loggedInUser.pk);
    const items = await userFeed.items();
    const firstItem = items[0];

    console.log(firstItem.caption);
  })();
});

console.log("Hello, world!");