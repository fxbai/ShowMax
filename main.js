const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
    const win = new BrowserWindow({
        width: 1550,
        height: 940,
        webPreferences: {
            preload: path.join(__dirname, "src/shared/nav.js")
        }
    });

  win.loadFile(path.join(__dirname, "src/home/home.html"));
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});