const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  send: (message, data) => ipcRenderer.send(message, data),
  on: (message, callback) => ipcRenderer.on(message, callback),
})
