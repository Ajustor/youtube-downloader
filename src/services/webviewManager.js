const { downloads } = require('../stores/downloads')

export class Webview {
  _instance = null
  wv
  folder = ''

  constructor() {
    this.wv = document.getElementById('webview')

    this.wv?.addEventListener('crashed', (e) => {
      this.reload()
    })

    this.wv?.addEventListener('plugin-crashed', (e) => {
      this.reload()
    })

    window.electronAPI.on('startDownload', (e, { name }) => {
      downloads.add({ name, percent: 0 })
    })

    window.electronAPI.on('percent', (e, { name, percent }) => {
      downloads.update(name, { percent })
      if (percent === '100.00') {
        downloads.remove(name)
      }
    })
  }

  static getInstance() {
    if (!Webview._instance) {
      Webview._instance = new Webview()
    }

    return Webview._instance
  }

  reload() {
    this.wv?.reload()
  }

  getUrl() {
    return this.wv?.src
  }

  download(getVideo) {
    window.electronAPI.send('download', { url: this.getUrl(), getVideo })
  }

  setDownloadFolder(folder) {
    this.folder = folder
  }
}
