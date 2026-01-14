import { getElementWithPath, getWindowUrl, identifyFieldChildPath } from './helpers'
import { state, highlightName, isHighlightingContainer } from '@/utils/state'
import { watch } from 'vue'
import type { WebsiteFilter } from './types'
import emitter from '@/utils/emitter';

const filterClass = 'ijf-highlight'

export default class Filter {
  private defaultJobDisplayMode: string = 'none'
  private container?: HTMLElement

  private stateChangedTimeoutId: number = 0
  private stateTimeoutDelay = 300
  private observer?: MutationObserver
  private failedAttempts: number = 0
  private websiteFilter: WebsiteFilter | undefined

  private highlightedElements: {
    [fieldName: string]: HTMLElement[]
  } = {}
  private editHighlightElements: HTMLElement[] = []

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

    emitter.on('filter-edit-field-updated', (fieldName) => {
      if (!this.websiteFilter) throw new Error('[20260114.2130]')
      if (!this.container) throw new Error('[20260114.2132]')

      const elementPath = identifyFieldChildPath(
        this.websiteFilter.containerProperties!, fieldName
      )
      if (!elementPath) {
        this.editHighlightElements.forEach(element => {
          element.classList.remove(filterClass)
        });
        this.editHighlightElements = []
        return
      }

      for (let i = 0; i < this.container.children.length; i++) {
        const jobElement = this.container.children[i] as HTMLElement
        const element = getElementWithPath(elementPath, jobElement)
        if (!element) continue
        
        if (!element.className.includes(filterClass)) {
          element.classList.add(filterClass)
          this.editHighlightElements.push(element)
        }
      }
    })
  }

  private updateContainer(): void {
    this.observer?.disconnect()

    this.websiteFilter = state.websiteFilterSettings[getWindowUrl()]
    if (this.websiteFilter?.containerProperties) {
      this.container = getElementWithPath(this.websiteFilter.containerProperties)
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
    if (!this.websiteFilter) throw new Error('[20260114.1805]')

    const profileId = this.websiteFilter.selectedFilterId
    if (!profileId) return this.clearFilter()

    const currentProfile = state.filterProfileSettings.profiles[profileId]
    if (!currentProfile) return this.clearFilter()

    const fieldPropertyArray = Object.entries(this.websiteFilter.fieldProperties)
      .filter(([key, value]) => value)

    for (let i = 0; i < this.container!.children.length; i++) {
      const jobElement = this.container!.children[i] as HTMLElement
      const isMatch = fieldPropertyArray.some(([fieldName, elementPath]) => {
        const element = getElementWithPath(elementPath!, jobElement)
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

    if (!this.websiteFilter) {
      throw new Error('[20260113.1636]')
    }

    const elementPath = this.websiteFilter.fieldProperties[fieldName]
    if (!elementPath) return

    this.highlightedElements[fieldName] = []
    for (let i = 0; i < this.container.children.length; i++) {
      const jobElement = this.container.children[i] as HTMLElement
      const element = getElementWithPath(elementPath, jobElement)
      if (!element) continue
      if (!element.className.includes(filterClass)) {
        element.classList.add(filterClass)
        this.highlightedElements[fieldName].push(element)
      }
    }
  }

  private unhighlightFieldsByName(fieldName: string) {

    this.highlightedElements[fieldName]?.forEach(element => {
      element.classList.remove(filterClass)
    });
    delete this.highlightedElements[fieldName]
  }



}
