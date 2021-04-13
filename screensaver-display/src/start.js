const { app, BrowserWindow, screen } = require('electron');

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		frame: false,
		fullscreen: true,
		webPreferences: {
			nodeIntegration: true
		}
	});

	win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// app.on('ready', function() {

//   // get the mouse position
//   let mousePos = screen.getCursorScreenPoint();
//   console.log(mousePos);
// });
