import { getElementWithPath, identifyFieldChildPath } from '@/utils/elementFunctions'
import { state, highlightName, highlightContainerPath, currentWebsiteSettings, websiteFilterProfile } from '@/utils/state'
import { watch } from 'vue'
import emitter from '@/utils/emitter';

const filterClass = 'ijf-highlight'

class Filter {
  private defaultJobDisplayMode: string = 'none'
  private container?: HTMLElement

  private observer?: MutationObserver
  private failedAttempts: number = 0

  private fieldHighlights: { [fieldName: string]: HTMLElement[] } = {}
  private editHighlightElements: HTMLElement[] = []
  private containerOverlay: HTMLElement | undefined

  constructor() {
    this.updateContainer()

    watch(currentWebsiteSettings, () => {
      this.updateContainer()
    })

    watch(websiteFilterProfile, () => {
      this.runFilter()
    }, { deep: true })

    watch(highlightName, (newValue, oldValue) => {
      if (newValue) {
        this.highlightFieldsByName(newValue)
      }
      if (oldValue) {
        this.unhighlightFieldsByName(oldValue)
      }
    })

    watch(highlightContainerPath, () => {
      this.containerOverlay?.remove()
      if (highlightContainerPath.value) {
        const container = getElementWithPath(highlightContainerPath.value)
        if (!container) throw new Error('[20260115.1554]')

        this.containerOverlay = this.createOverlayHighlight(container)
      }
    })

    emitter.on('filter-edit-field-updated', (fieldName) => {
      if (!currentWebsiteSettings.value) throw new Error('[20260114.2130]')
      if (!this.container) throw new Error('[20260114.2132]')

      const elementPath = identifyFieldChildPath(
        currentWebsiteSettings.value.containerProperties!, fieldName
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

  private createOverlayHighlight(element: HTMLElement): HTMLElement {
    const rect = element.getBoundingClientRect();

    const overlay = document.createElement("div");
    overlay.className = filterClass

    Object.assign(overlay.style, {
      position: "fixed",
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      zIndex: 2147483646,
      pointerEvents: "none",
    });

    document.body.appendChild(overlay);
    return overlay
  }

  private updateContainer(): void {
    console.log('update container')
    this.observer?.disconnect()

    if (currentWebsiteSettings.value?.containerProperties) {
      this.container = getElementWithPath(currentWebsiteSettings.value.containerProperties)
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
    console.log('run filter')
    if (!currentWebsiteSettings.value) return
    if (!websiteFilterProfile.value) return

    const fieldPropertyArray = Object.entries(currentWebsiteSettings.value.fieldProperties)
      .filter(([key, value]) => value)

    for (let i = 0; i < this.container!.children.length; i++) {
      const jobElement = this.container!.children[i] as HTMLElement
      const isMatch = fieldPropertyArray.some(([fieldName, elementPath]) => {
        const element = getElementWithPath(elementPath!, jobElement)
        if (!element) return
        const elementWords = element.innerText.toLowerCase().split(/[ ,/]+/)
        return websiteFilterProfile.value![fieldName]?.blacklistKeywords
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


    if (!currentWebsiteSettings.value) {
      throw new Error('[20260113.1636]')
    }

    const elementPath = currentWebsiteSettings.value.fieldProperties[fieldName]
    if (!elementPath) return

    this.fieldHighlights[fieldName] = []
    for (let i = 0; i < this.container.children.length; i++) {
      const jobElement = this.container.children[i] as HTMLElement
      const element = getElementWithPath(elementPath, jobElement)
      if (!element) continue
      if (!element.className.includes(filterClass)) {
        const newElement = this.createOverlayHighlight(element)
        this.fieldHighlights[fieldName].push(newElement)
      }
    }
  }

  private unhighlightFieldsByName(fieldName: string) {
    this.fieldHighlights[fieldName]?.forEach(element => {
      element.remove()
    });
    delete this.fieldHighlights[fieldName]
  }

  public getFieldsByName(fieldName: string): HTMLElement[] {
    const elementPath = currentWebsiteSettings.value?.fieldProperties[fieldName]
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