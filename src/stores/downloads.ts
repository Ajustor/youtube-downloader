import { writable } from 'svelte/store'

function createDownloadsArray() {
  const { subscribe, set, update } = writable([])

  return {
    subscribe,
    add: (download) => update((downloads) => [...downloads, download]),
    remove: (downloadName: string) =>
      update((downloads) =>
        downloads.filter(({ name }) => name !== downloadName)
      ),
    update: (downloadName: string, update) =>
      update((downloads) =>
        downloads.map((download) =>
          download.name === downloadName ? { ...download, ...update } : download
        )
      ),
  }
}

export const downloads = createDownloadsArray()
