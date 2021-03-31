const { app, BrowserWindow, screen} = require('electron')
const path = require("path")
const isDev = require("electron-is-dev")

const shouldShowTempSettings = process.argv.includes("--temp-settings");
const urlBasis = isDev ? "http://localhost:3000/" : `file://${path.join(__dirname, "../build/index.html")}`;

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    fullscreen: !shouldShowTempSettings,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // For Development: Run from localhost (background react server)
  // For Builds: Run from index.html file in build/
  win.loadURL(shouldShowTempSettings ? urlBasis + "#/temp_settings" : urlBasis);
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})