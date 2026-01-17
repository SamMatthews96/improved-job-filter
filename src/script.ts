import { createApp } from 'vue'
import Script from '@/components/Script.vue'
import WebpageContentModifier from '@/utils/webpageContentModifier'

const id = 'ijf-script-root'

function createOverlay(): void {
    if (document.querySelector(`#${id}`)) return

    const host = document.createElement('div')
    host.id = id
    host.className = "improved-job-filter"
    document.body.appendChild(host)
    createApp(Script).mount(host)
}

console.log('improved-job-filter loading')

createOverlay()

// WebpageContentModifier
