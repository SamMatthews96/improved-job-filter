
import { createSelector, getElementWithPath, getWindowUrl } from './helpers'
import { state } from './state'
import { watch } from 'vue'
import type { WebsiteFilter } from './types'

export default class Filter {

    private defaultJobDisplayMode: string = ''
    private hasFilterRun: boolean = false
    private websiteFilter: WebsiteFilter
    private container: HTMLElement | null = null;

    constructor() {
        console.log('filter', state)
        this.websiteFilter = state.websiteFilterSettings[getWindowUrl()]!
        this.setContainer()
        // when filter changes, apply filter
        watch(state, () => {
            console.log('filter', state)
            this.runFilter()
        })
        this.runFilter()
        // when page content changes, re apply filter

    }

    private setContainer() {
        if (!this.websiteFilter?.containerProperties) return;
        this.container = getElementWithPath(this.websiteFilter.containerProperties)
        const observer = new MutationObserver(() => {
            this.runFilter()
        })
        this.setContainer()
        observer.observe(this.container, {
            childList: true,
        })
    }

    public runFilter() {
        if (!this.container) return;

        // get display mode of jobs
        if (!this.hasFilterRun) {
            const child = this.container.children[0]
            if (child instanceof HTMLElement) {
                this.defaultJobDisplayMode = child.style.display
            }
        }

        // get fields within job
        for (let i = 0; i < this.container.children.length; i++) {
            const jobElement = this.container.children[i] as HTMLElement

            let isMatch = false

            Object.entries(this.websiteFilter.fieldProperties)
                .forEach(([fieldName, elementPath]) => {
                    const element = getElementWithPath(elementPath, jobElement)
                    const elementWords = element.innerText.toLowerCase().split(' ')
                    const profileId = state.filterProfileSettings.selectedFilterId
                    if (!profileId) return
                    const currentProfile = state.filterProfileSettings.profiles[profileId]!
                    currentProfile[fieldName]?.blacklistKeywords.split(' ')
                        .forEach(keyword => {
                            if (elementWords.includes(keyword.toLowerCase())) {
                                isMatch = true
                            }
                        })
                })

            // compare against current filter
            // if match, hide item, else, set display to its default
            if (isMatch) {
                jobElement.style.display = 'none'
            } else {
                jobElement.style.display = this.defaultJobDisplayMode
            }
        }

        this.hasFilterRun = true
    }
}
