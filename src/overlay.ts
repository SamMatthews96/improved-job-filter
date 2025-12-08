import './assets/main.css'
import { createApp } from 'vue'
import Overlay from './components/Overlay.vue'

const id = 'improved-job-filter-overlay'

export default function createOverlay() {
  if (document.querySelector(`#${id}`)) {
    return
  }
  const overlayRoot = document.createElement('div')
  overlayRoot.id = id
  const body: HTMLBodyElement = document.querySelector('body') as HTMLBodyElement

  body.appendChild(overlayRoot)

  const overlay = createApp(Overlay)
  overlay.mount(`#${id}`)
}
