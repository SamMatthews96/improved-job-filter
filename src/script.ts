import Filter from "@/utils/filter"
import Runtime from "@/utils/runtime"
import ChromeRuntime from "@/utils/chromeRuntime"
type Manifest = chrome.runtime.Manifest

console.log('script working [16:07/01-12-2025]', window.location.href)

const manifest: Manifest = Runtime.getManifest()

if (Runtime instanceof ChromeRuntime) {
    const matches = manifest?.content_scripts?.[0]?.matches ?? []
    const pageMatches = matches
        .map(match => match.replace('*', ''))
        .filter(match => window.location.href.includes(match))
    const pageMatch = pageMatches[0]

    switch (pageMatch) {
        case 'https://uk.indeed.com/':
            new Filter('#mosaic-provider-jobcards > div > ul', {
                title: 'h2 > a > span',
                company: 'span[data-testid="company-name"]',
            })
            break;
        default:
            throw new Error(`[20251201.2311] ${pageMatch}`);
    }

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


