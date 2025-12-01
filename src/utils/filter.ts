import type { JobFieldSelectors } from "./types";
import { state } from "@/utils/state";
import Runtime from "./runtime";

export default class Filter {
    private containerSelector: string;
    private jobFilterSelectors: JobFieldSelectors;

    private defaultJobDisplayMode: string = '';

    private hasFilterRun: boolean = false;

    constructor(containerSelector: string, jobFieldSelectors: JobFieldSelectors) {
        this.containerSelector = containerSelector;
        this.jobFilterSelectors = jobFieldSelectors;

        // when storage changes, re apply filter
        Runtime.addStorageListener(request => {
            console.log('onchange', request)
            this.runFilter()
        })
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
        console.log('filter')
        // get container
        const container: Element | null = this.getContainer()
        if (container == null) {
            console.error('[20251130.2217] Failed to identify container')
            return
        }

        // get display mode of jobs
        if (!this.hasFilterRun) {
            const child = container.children[0]
            if (!(child instanceof HTMLElement)) return
            this.defaultJobDisplayMode = child.style.display
        }

        console.log(state)
        // get fields within job
        for (let i = 0; i < container.children.length; i++) {
            const jobElement = container.children[i]
            if (!(jobElement instanceof HTMLElement) || jobElement == undefined) {
                console.warn('[20251130.2331]')
                continue
            }
            const titleElement = jobElement.querySelector(this.jobFilterSelectors.title)
            if (!(titleElement instanceof HTMLElement)) {
                console.warn('[20251130.2335]')
                continue
            }
            const title = titleElement.innerText

            const companyElement = jobElement.querySelector(this.jobFilterSelectors.company)
            if (!(companyElement instanceof HTMLElement)) {
                console.warn('[20251130.2336]')
                continue
            }
            const company = companyElement.innerText

            // compare against current filter
            const isMatch: boolean = false;
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