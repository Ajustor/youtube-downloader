import fs from 'fs'
import { downloads } from 'src/stores/downloads'
import { exec } from 'youtube-dl-exec'

export class Webview {
  private static _instance: Webview
  private wv: any
  private folder: string = ''

  private constructor() {
    this.wv = document.getElementById('webview')

    this.wv?.addEventListener('crashed', (e) => {
      this.reload()
    })

    this.wv?.addEventListener('plugin-crashed', (e) => {
      this.reload()
    })
  }

  public static get instance() {
    if (!Webview._instance) {
      Webview._instance = new Webview()
    }

    return Webview._instance
  }

  reload() {
    console.log('reload')
    this.wv?.reload()
  }

  getUrl(): string {
    return this.wv?.getUrl()
  }

  download(getVideo: boolean) {
    const folder = this.folder
    let video
    try {
      video = exec(this.getUrl())
    } catch (e) {}

    console.log(video)

    video.on('info', (info) => {
      const name = info.title.replace('/', '_')

      video.stdout.pipe(fs.createWriteStream(`${folder}/${name}`))

      downloads.add({ name, percent: 0 })

      video.on('progress', function data(chunk, downloaded, total) {
        let percent = ((downloaded / total) * 100).toFixed(2)
        downloads.update(name, { percent })
        if (percent === '100') {
          downloads.remove(name)
        }
      })
    })
  }

  setDownloadFolder(folder: string) {
    this.folder = folder
  }
}
