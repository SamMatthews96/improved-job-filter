import { getElementWithPath, getWindowUrl } from './helpers'
import { state, highlightName, isHighlightingContainer } from '@/utils/state'
import { watch } from 'vue'

const filterClass = 'ijf-highlight'

export default class Filter {
  private defaultJobDisplayMode: string = 'none'
  private container?: HTMLElement

  private stateChangedTimeoutId: number = 0
  private stateTimeoutDelay = 300
  private observer?: MutationObserver
  private failedAttempts: number = 0

  private highlightedElements: {
    [fieldName: string]: HTMLElement[]
  } = {}

  constructor() {
    this.updateContainer()

    watch(state, () => {
      clearTimeout(this.stateChangedTimeoutId)
      this.stateChangedTimeoutId = window.setTimeout(() => {
        this.updateContainer()
      }, this.stateTimeoutDelay)
    })

    watch(highlightName, (newValue, oldValue) => {
      if (newValue) {
        this.highlightFieldsByName(newValue)
      }
      if (oldValue) {
        this.unhighlightFieldsByName(oldValue)
      }
    })

    watch(isHighlightingContainer, () => {
      if (isHighlightingContainer.value) {
        this.container!.classList.add(filterClass)
      } else {
        this.container!.classList.remove(filterClass)
      }
    })
  }

  private updateContainer(): void {
    this.observer?.disconnect()

    const websiteFilter = state.websiteFilterSettings[getWindowUrl()]
    if (websiteFilter?.containerProperties) {
      this.container = getElementWithPath(websiteFilter.containerProperties)
      if (!this.container) {
        if (this.failedAttempts >= 3) {
          throw new Error('[20260112.0036]')
        }
        this.failedAttempts++
        console.log('failed to get container, reattempting ...')
        setTimeout(() => {
          this.updateContainer()
        }, 1000)
        return
      }

      if (
        this.container.children[0] instanceof HTMLElement &&
        this.container.children[0].style.display != 'none'
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

  private runFilter(): void {
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
        if (!element) return
        const elementWords = element.innerText.toLowerCase().split(/[ ,/]+/)
        return currentProfile[fieldName]?.blacklistKeywords
          .split(' ')
          .some((keyword) => elementWords.includes(keyword.toLowerCase()))
      })

      jobElement.style.display = isMatch ? 'none' : this.defaultJobDisplayMode
    }
  }

  private clearFilter(): void {
    for (let i = 0; i < this.container!.children.length; i++) {
      const jobElement = this.container!.children[i] as HTMLElement
      jobElement.style.display = this.defaultJobDisplayMode
    }
  }

  private highlightFieldsByName(fieldName: string) {
    if (!this.container) {
      throw new Error('[20260113.1634]')
    }

    const websiteFilter = state.websiteFilterSettings[getWindowUrl()]
    if (!websiteFilter) {
      throw new Error('[20260113.1636]')
    }

    const elementPath = websiteFilter.fieldProperties[fieldName]
    if (!elementPath) throw new Error('[20260113.1756]')

    this.highlightedElements[fieldName] = []
    for (let i = 0; i < this.container!.children.length; i++) {
      const jobElement = this.container!.children[i] as HTMLElement
      const element = getElementWithPath(elementPath, jobElement)
      if (!element) continue
      if (!element.className.includes(filterClass)) {
        element.classList.add(filterClass)
        this.highlightedElements[fieldName].push(element)
      }
    }
  }

  private unhighlightFieldsByName(fieldName: string) {
    this.highlightedElements[fieldName]!.forEach(element => {
      element.classList.remove(filterClass)
    });
    delete this.highlightedElements[fieldName]
  }

}
