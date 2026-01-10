
import { getElementWithPath, getWindowUrl } from './helpers'
import { state } from '@/utils/state'
import { watch } from 'vue'

export default class Filter {
    private defaultJobDisplayMode: string = 'none';
    private container?: HTMLElement;

    private stateChangedTimeoutId: number = 0;
    private stateTimeoutDelay = 300;
    private observer?: MutationObserver;

    constructor() {
        this.updateContainer()

        watch(state, () => {
            clearTimeout(this.stateChangedTimeoutId)
            this.stateChangedTimeoutId = window.setTimeout(() => {
                this.updateContainer()
            }, this.stateTimeoutDelay)
        })
    }

    private updateContainer(): void {
        console.log('filter', state)
        this.observer?.disconnect()

        const websiteFilter = state.websiteFilterSettings[getWindowUrl()]
        if (websiteFilter) {
            this.container = getElementWithPath(websiteFilter.containerProperties)
            if (
                this.container.children[0] instanceof HTMLElement
                && this.container.children[0].style.display != 'none'
            ) {
                this.defaultJobDisplayMode = this.container.children[0].style.display
            }
            this.observer = new MutationObserver(() => {
                this.runFilter()
            })
            this.observer.observe(this.container, {
                childList: true,
            })
            this.runFilter()
        } else {
            if (this.container) {
                this.clearFilter()
                this.container = undefined
            }
        }
    }

    public runFilter(): void {
        const websiteFilter = state.websiteFilterSettings[getWindowUrl()]
        if (!websiteFilter) return this.clearFilter()

        const profileId = websiteFilter.selectedFilterId
        if (!profileId) return this.clearFilter()

        const currentProfile = state.filterProfileSettings.profiles[profileId]
        if (!currentProfile) return this.clearFilter()

        const fieldPropertyArray = Object.entries(websiteFilter.fieldProperties)

        for (let i = 0; i < this.container!.children.length; i++) {
            const jobElement = this.container!.children[i] as HTMLElement
            const isMatch = fieldPropertyArray.some(([fieldName, elementPath]) => {
                const element = getElementWithPath(elementPath, jobElement)
                const elementWords = element.innerText.toLowerCase().split(' ')
                return currentProfile[fieldName]?.blacklistKeywords.split(' ')
                    .some(keyword => elementWords.includes(keyword.toLowerCase()))
            })

            jobElement.style.display = isMatch
                ? 'none' : this.defaultJobDisplayMode
        }
    }

    private clearFilter(): void {
        for (let i = 0; i < this.container!.children.length; i++) {
            const jobElement = this.container!.children[i] as HTMLElement
            jobElement.style.display = this.defaultJobDisplayMode
        }
    }
}
