import Filter from "@/utils/filter"
import Runtime from "./utils/runtime"
import ChromeRuntime from "./utils/chromeRuntime"
type Manifest = chrome.runtime.Manifest

console.log('script working [21:21/30-11-2025]', window.location.href)

if (Runtime instanceof ChromeRuntime) {
    const manifest: Manifest = Runtime.getManifest()
    // indeed
    /* 
    */
    new Filter('#mosaic-provider-jobcards ul', {
        title: '',
        company: '',
    })
    // title="Leeds Software Engineering Graduate Programme 2026-2027"
    // data-testid="company-name" Accenture

} else {
    // either there is a bug, or it is running locally
    console.log('test mode')
    new Filter('#test-job-container', {
        title: 'div[class="test-title"]',
        company: 'div[class="test-company"]'
    })
}


