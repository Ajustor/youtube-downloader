<script lang="ts">
  import DownloadElement from './DownloadElement.svelte'
  import { downloads } from '../stores/downloads'
</script>

<div class="list" />

<ul>
  {#each $downloads as download}
    <DownloadElement element={download} />
  {/each}
</ul>

<style lang="scss">
  /* your styles go here */
</style>
