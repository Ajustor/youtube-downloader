import { app, BrowserWindow, dialog, systemPreferences } from 'electron'

let mainWindow

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
    },
  })

  // and load the index.html of the app.
  mainWindow.loadFile('./index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.webContents.on('ipc-message', async (e, channel, message) => {
    switch (channel) {
      case 'getFolder':
        const { filePaths } = await dialog.showOpenDialog({
          properties: ['openDirectory'],
        })
        if (filePaths.length) {
          mainWindow.webContents.send('getFolder', filePaths[0])
        }
        break
      // case 'getMP3':
      //   ffmpeg(message.path + '.mp4')
      //     .save(message.path + '.mp3')
      //     .on('end', function () {
      //       unlink(message.path + '.mp4', (err) => {
      //         if (err) return dialog.showErrorBox('Youtube downloader', err)
      //         mainWindow.webContents.send('convertionEnd', {
      //           id: message.id,
      //           name: message.name,
      //         })
      //       })
      //     })
      //   break
      case 'ready':
        mainWindow.webContents.send('darkMode', systemPreferences.isDarkMode())
        break
      default:
    }
  })

  if (process.platform === 'darwin') {
    systemPreferences.subscribeNotification(
      'AppleInterfaceThemeChangedNotification',
      function theThemeHasChanged() {
        mainWindow.webContents.send('darkMode', systemPreferences.isDarkMode())
      }
    )
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

try {
  require('electron-reloader')(module)
} catch (_) {}
