
export default class Filter {
    private containerSelector: string;

    constructor(containerSelector: string) {
        this.containerSelector = containerSelector

        // when storage changes, re apply filter
        if (chrome.storage) {
            chrome.storage.local.onChanged.addListener(request => {
                console.log('onchange', request)
                this.runFilter()
            })
        }
        // when page content changes, re apply filter
        const observer = new MutationObserver(mutations => {
            console.log('mutation observed')
            this.runFilter()
        })
        const element = document.querySelector(this.containerSelector)
        if (element) {
            observer.observe(element, {
                childList: true
            })
        }

        this.runFilter()
    }

    getContainer(): Element | null {
        const matches = document.querySelectorAll(this.containerSelector)
        switch (matches.length) {
            case 0:
                console.error('[20251130.2201] Failed to get job list container')
                return null
            case 1:
                return matches[0] ?? null
            default:
                console.error('[20251130.2202] Found multiple matches for job list container')
                return null;
        }
    }

    runFilter() {
        // get container
        const container: Element | null = this.getContainer()
        if (container == null) {
            console.error('[20251130.2217] Failed to identify container')
            return
        }

        // get jobs within container
        container.childNodes

        // get display mode of jobs
        const child = container.childNodes[0]
        if (!child) return
        console.log(child)
        // get fields within job
        // compare against current filter
        // if match, hide item, else, set display to its default
    }
}