import { createApp } from 'vue'
import WebsiteConfig from '@/components/WebsiteConfig.vue'
import Filter from '@/utils/filter'

const id = 'improved-job-filter-overlay'

function createOverlay(): void {
    if (document.querySelector(`#${id}`)) return

    const host = document.createElement('div')
    host.id = id
    document.body.appendChild(host)
    createApp(WebsiteConfig).mount(host)
}

console.log('improved-job-filter loading')

createOverlay()

new Filter()
