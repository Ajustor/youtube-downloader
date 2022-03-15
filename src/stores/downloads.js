import { writable } from 'svelte/store'

function createDownloadsArray() {
  const { subscribe, set, update } = writable([])

  return {
    subscribe,
    add: (download) => update((downloads) => [...downloads, download]),
    remove: (downloadName) =>
      update((downloads) =>
        downloads.filter(({ name }) => name !== downloadName)
      ),
    update: (downloadName, downloadUpdate) =>
      update((downloads) =>
        downloads.map((download) =>
          download.name === downloadName
            ? { ...download, ...downloadUpdate }
            : download
        )
      ),
  }
}

export const downloads = createDownloadsArray()
