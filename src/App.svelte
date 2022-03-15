<script>
  import DownloadList from './components/DownloadList.svelte'
  import { Webview } from './services/webviewManager'

  let name = 'world'
  let downloadVideo = false

  const download = async () => {
    const webview = Webview.getInstance()

    webview.download(downloadVideo)
  }

  const reload = async () => {
    const webview = Webview.getInstance()

    await webview.reload()
  }

  const selectFolder = () => {
    window.electronAPI.send('getFolder')
  }
</script>

<main>
  <aside class="h-full">
    <span>Youtube ne répond plus ?</span>
    <button on:click={reload}>Cliquez ici</button>
    <button on:click={selectFolder}>Sélectionner un dossier</button>
    <div class="controller">
      <div class="form-check form-switch">
        <input
          bind:checked={downloadVideo}
          class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
        />
        <label
          class="form-check-label inline-block text-gray-800"
          for="flexSwitchCheckDefault"
        >
          Télécharger la vidéo ?
        </label>
      </div>

      <button on:click={download}>
        Télécharger {downloadVideo ? 'la vidéo' : "l'audio"}
      </button>
    </div>
    <DownloadList />
  </aside>
  <div class="webview">
    <webview
      src="https://youtube.com/"
      id="webview"
      class="h-full"
      width="100%"
      height="100%"
    />
  </div>
</main>

<style lang="scss">
  main {
    height: 100%;
    width: 100%;
    display: flex;

    overflow: hidden;

    aside {
    }

    .webview {
      flex-grow: 1;
    }
  }
</style>
