const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("nav", {
    go: (relativePath) => {
        window.location = relativePath;
    }
});