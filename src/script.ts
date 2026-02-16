import { createApp } from 'vue'
import Script from '@/components/Script.vue'
import WebpageContentModifier from './utils/webpageContentModifier'

const id = 'ijf-script-root'

function createOverlay(): void {
  console.log('improved-job-filter loading')
  if (document.querySelector(`#${id}`)) return

  const host = document.createElement('div')
  host.id = id
  host.className = 'improved-job-filter'
  document.body.appendChild(host)
  createApp(Script).mount(host)
  new WebpageContentModifier()
  console.log('improved-job-filter loaded')
}

createOverlay()
