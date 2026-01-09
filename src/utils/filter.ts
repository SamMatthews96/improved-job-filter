
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
        console.log('filter', state)

        this.updateContainer()

        watch(state, () => {
            clearTimeout(this.stateChangedTimeoutId)
            this.stateChangedTimeoutId = setTimeout(() => {
                console.log('filter', state)

                this.updateContainer()

            }, this.stateTimeoutDelay)
        })
    }

    private updateContainer(): void {
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
                for (let i = 0; i < this.container.children.length; i++) {
                    const jobElement = this.container.children[i] as HTMLElement
                    jobElement.style.display = this.defaultJobDisplayMode
                }
                this.container = undefined
            }
        }

    }

    public runFilter(): void {
        const websiteFilter = state.websiteFilterSettings[getWindowUrl()]
        const fieldPropertyArray = websiteFilter
            ? Object.entries(websiteFilter.fieldProperties) : []

        // get fields within job
        for (let i = 0; i < this.container!.children.length; i++) {
            const jobElement = this.container!.children[i] as HTMLElement

            let isMatch = false

            fieldPropertyArray.forEach(([fieldName, elementPath]) => {
                const element = getElementWithPath(elementPath, jobElement)
                const elementWords = element.innerText.toLowerCase().split(' ')
                const profileId = state.filterProfileSettings.selectedFilterId
                if (!profileId) return
                const currentProfile = state.filterProfileSettings.profiles[profileId]
                if (!currentProfile) return;
                currentProfile[fieldName]?.blacklistKeywords.split(' ')
                    .forEach(keyword => {
                        if (elementWords.includes(keyword.toLowerCase())) {
                            isMatch = true
                        }
                    })
            })

            jobElement.style.display = isMatch
                ? 'none' : this.defaultJobDisplayMode
        }

    }
}
