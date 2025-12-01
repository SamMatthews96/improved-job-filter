import Filter from "@/utils/filter"
import Runtime from "./utils/runtime"
import ChromeRuntime from "./utils/chromeRuntime"
type Manifest = chrome.runtime.Manifest

console.log('script working [16:07/01-12-2025]', window.location.href)

if (Runtime instanceof ChromeRuntime) {
    const manifest: Manifest = Runtime.getManifest()

    // indeed
    new Filter('#mosaic-provider-jobcards > div > ul', {
        title: 'h2 > a > span',
        company: 'span[data-testid="company-name"]',
    })

} else {
    // new Filter('#test-job-container', {
    //     title: 'div[class="test-title"]',
    //     company: 'div[class="test-company"]'
    // })
    new Filter('ul.css-pygyny', {
        title: 'h2 > a > span',
        company: 'span[data-testid="company-name"]',
    })
}


