import './assets/main.css'
import { createApp } from 'vue'
import Overlay from './Overlay.vue'

const overlayRoot = document.createElement('div')
overlayRoot.id = "improved-job-filter-overlay"
const body: HTMLBodyElement = document.querySelector('body') as HTMLBodyElement;

const overlay = createApp(Overlay)

body.appendChild(overlayRoot)

overlay.mount('#improved-job-filter-overlay')


// then, make it show / hide based on a signal
// then, make it show / hide based on a runtime.sendMessage
