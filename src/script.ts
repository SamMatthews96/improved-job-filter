import { createApp } from 'vue'
import WebsiteConfig from '@/components/WebsiteConfig.vue'
import Filter from '@/utils/filter'

import cssUrl from './assets/style.scss?url'
import './assets/style.css'

const id = 'improved-job-filter-overlay'

function createOverlay(): void {
    if (document.querySelector(`#${id}`)) {
        return
    }
    const host = document.createElement('div')
    host.id = id
    document.body.appendChild(host)

    const shadow = host.attachShadow({ mode: "open" });

    const shadowRoot = document.createElement('div')
    shadowRoot.id = 'improved-job-filter-root'
    shadow.appendChild(shadowRoot)

    const overlay = createApp(WebsiteConfig)
    overlay.mount(shadowRoot)

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = cssUrl
    shadow.appendChild(link)

}

console.log('improved-job-filter loading')

createOverlay()

new Filter()
