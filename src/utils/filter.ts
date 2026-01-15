import { getElementWithPath, getWindowUrl, identifyFieldChildPath } from './helpers'
import { state, highlightName, isHighlightingContainer } from '@/utils/state'
import { watch } from 'vue'
import type { WebsiteFilter } from './types'
import emitter from '@/utils/emitter';

const filterClass = 'ijf-highlight'

class Filter {
  private defaultJobDisplayMode: string = 'none'
  private container?: HTMLElement

  private stateChangedTimeoutId: number = 0
  private observer?: MutationObserver
  private failedAttempts: number = 0
  private websiteFilter: WebsiteFilter | undefined

  private highlightedElements: {
    [fieldName: string]: HTMLElement[]
  } = {}
  private editHighlightElements: HTMLElement[] = []
  private containerOverlay: HTMLElement | undefined 

  constructor() {
    this.updateContainer()

    watch(state, () => {
      console.log('state', state)
      clearTimeout(this.stateChangedTimeoutId)
      this.updateContainer()
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
      if (!this.container) return
      if (isHighlightingContainer.value) {
        const rect = this.container.getBoundingClientRect();
        this.containerOverlay = document.createElement("div");
        this.containerOverlay.id = 'container-highlight'
        this.containerOverlay.className = filterClass

        Object.assign(this.containerOverlay.style, {
          position: "fixed",
          top: `${rect.top}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          zIndex: 2147483646, 
          pointerEvents: "none", 
        });

        document.body.appendChild(this.containerOverlay);
      } else {
        this.containerOverlay?.remove()
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
          // @todo notify when we can't get the container
          return
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
    if (!this.container) return


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

  public getFieldsByName(fieldName: string): HTMLElement[] {
    const elementPath = this.websiteFilter?.fieldProperties[fieldName]
    if (!elementPath) return []
    if (!this.container) return []

    const elements = []
    for (let i = 0; i < this.container.children.length; i++) {
      const jobElement = this.container.children[i] as HTMLElement
      const element = getElementWithPath(elementPath, jobElement)
      if (!element) continue
      elements.push(element)
    }
    return elements
  }

}

export default new Filter()