const { app, BrowserWindow, ipcMain } = require('electron');

const fs = require("fs");
const https = require("https");

const path = require('path');
const url = require('url');

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

console.log("Hello, world!");