import type { JobFieldSelectors, StoredData } from "./types";
import Runtime from "./runtime";

export default class Filter {
    private containerSelector: string;
    private jobFilterSelectors: JobFieldSelectors;
    private filterConfig: StoredData = {
        blacklistedCompanies: [],
        blacklistedJobTitles: []
    }

    private defaultJobDisplayMode: string = '';
    private hasFilterRun: boolean = false;

    constructor(containerSelector: string, jobFieldSelectors: JobFieldSelectors) {
        this.containerSelector = containerSelector;
        this.jobFilterSelectors = jobFieldSelectors;

        // when storage changes, re apply filter
        Runtime.addStorageListener(storage => {
            Object.assign(this.filterConfig, storage)
            this.runFilter()
        })
        // when page content changes, re apply filter
        const observer = new MutationObserver(() => {
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

    private getContainer(): Element | null {
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

    public runFilter() {
        // get container
        const container: Element | null = this.getContainer()
        if (container == null) {
            console.error('[20251130.2217] Failed to identify container')
            return
        }

        // get display mode of jobs
        if (!this.hasFilterRun) {
            const child = container.children[0]
            if (child instanceof HTMLElement) {
                this.defaultJobDisplayMode = child.style.display
            }
        }

        // get fields within job
        for (let i = 0; i < container.children.length; i++) {
            const jobElement = container.children[i]
            if (!(jobElement instanceof HTMLElement) || jobElement == undefined) {
                console.warn('[20251130.2331]', jobElement)
                continue
            }
            const titleElement = jobElement.querySelector(this.jobFilterSelectors.title)
            if (!(titleElement instanceof HTMLElement)) {
                console.warn('[20251130.2335]', titleElement)
                continue
            }
            const titleWords = titleElement.innerText.toLowerCase().split(' ')

            const companyElement = jobElement.querySelector(this.jobFilterSelectors.company)
            if (!(companyElement instanceof HTMLElement)) {
                console.warn('[20251130.2336]', companyElement)
                continue
            }
            const companyWords = companyElement.innerText.toLowerCase().split(' ')

            let isMatch = false;
            this.filterConfig.blacklistedCompanies.forEach(company => {
                if (companyWords.includes(company.toLowerCase())) {
                    isMatch = true;
                }
            })
            this.filterConfig.blacklistedJobTitles.forEach(jobTitle => {
                if (titleWords.includes(jobTitle.toLowerCase())) {
                    isMatch = true;
                }
            })

            // compare against current filter
            // if match, hide item, else, set display to its default
            if (isMatch) {
                jobElement.style.display = 'none';
            } else {
                jobElement.style.display = this.defaultJobDisplayMode;
            }
        }

        this.hasFilterRun = true
    }
}