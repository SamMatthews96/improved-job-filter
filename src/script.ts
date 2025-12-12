import { createApp } from 'vue'
import WebsiteConfig from './components/WebsiteConfig.vue'
import Filter from './utils/filter'

const id = 'improved-job-filter-overlay'

function createOverlay() {
    if (document.querySelector(`#${id}`)) {
        return
    }
    const overlayRoot = document.createElement('div')
    overlayRoot.id = id
    const body: HTMLBodyElement = document.querySelector('body') as HTMLBodyElement

    body.appendChild(overlayRoot)

    const overlay = createApp(WebsiteConfig)
    overlay.mount(`#${id}`)
}


console.log('improved-job-filter loading')
createOverlay()

new Filter()