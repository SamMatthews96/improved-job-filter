import { createApp } from 'vue'
import WebsiteConfig from '@/components/WebsiteConfig.vue'
import Filter from '@/utils/filter'

const id = 'ijf-script-root'

function createOverlay(): void {
    if (document.querySelector(`#${id}`)) return

    const host = document.createElement('div')
    host.id = id
    host.className = "improved-job-filter"
    document.body.appendChild(host)
    createApp(WebsiteConfig).mount(host)
}

console.log('improved-job-filter loading')

createOverlay()

new Filter()
