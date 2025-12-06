import './assets/main.css'
import { createApp } from 'vue'
import Overlay from './Overlay.vue'

const overlayRoot = document.createElement('div')
overlayRoot.id = "improved-job-filter-overlay"
const body: HTMLBodyElement = document.querySelector('body') as HTMLBodyElement;

body.appendChild(overlayRoot)

const overlay = createApp(Overlay)
overlay.mount('#improved-job-filter-overlay')

// @todo
// then, make it show / hide based on a signal
// then, make it show / hide based on a runtime.sendMessage
