<script lang="ts">
  import DownloadList from 'src/components/DownloadList.svelte'
  import { Webview } from 'src/services/webviewManager'

  let name: string = 'world'
  const webview = Webview.instance
  let downloadVideo = false

  const download = async () => {
    await webview.download(downloadVideo)
  }
</script>

<main>
  <aside class="h-full">
    <span>Youtube ne répond plus ?</span>
    <button on:click={webview.reload}>Cliquez ici</button>
    <div class="controller">
      <button on:click={download}
        >Télécharger {downloadVideo ? 'la vidéo' : "l'audio"}</button
      >
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
