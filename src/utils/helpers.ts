import type { ElementAttributes } from './types'

export function getCommonParent(node1: HTMLElement, node2: HTMLElement): HTMLElement | null {
  // Determine which API is available on the node
  const method: 'contains' | 'compareDocumentPosition' =
    'contains' in node1 ? 'contains' : 'compareDocumentPosition'

  const test = method === 'contains' ? 1 : Node.DOCUMENT_POSITION_CONTAINED_BY

  let current: Node | null = node1

  while ((current = current.parentNode)) {
    // TypeScript refinement for dynamic method access
    const result = (current as any)[method](node2)
    if ((result & test) === test) {
      return current as HTMLElement
    }
  }

  return null
}

export function getElementWithText(text: string): HTMLElement | null {
  let xpath = `//*[text()='${text}']`
  const match = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    .singleNodeValue as HTMLElement | null
  return match
}

export function getRelativeSelector(container: HTMLElement, fieldElements: HTMLElement[]): string {
  let currentElements = fieldElements
  const attributeList: ElementAttributes[] = [];
  while (currentElements[0] != container) {
    const attributes = getCommonAttributes(currentElements)
    attributeList.push(attributes)
    currentElements = currentElements.map((e) => e.parentElement) as HTMLElement[]
    if (!currentElements[0]) throw new Error('[20251208.0041]')
  }
  console.log(attributeList)
  //@todo this selector logic will pay no mind to nth-child
  // this could (unlikely) fail to narrow down to 1 element
  


  return ''
}

function getCommonAttributes(fieldElements: HTMLElement[]): ElementAttributes {
  const firstElement = fieldElements[0] as HTMLElement
  const commonAttributes: ElementAttributes = getElementAttributes(firstElement)
  // iterate over the equivalent elements
  for (let i = 1; i < length; i++) {
    const element = fieldElements[i]
    if (!element) throw new Error('[20251207.2328]')

    // purge values that are different
    const elementAttributes = getElementAttributes(element)
    Object.keys(commonAttributes).forEach((key) => {
      if (elementAttributes[key] == undefined) {
        delete commonAttributes[key]
      } else {
        if (elementAttributes[key] != commonAttributes[key]) {
          delete commonAttributes[key]
        }
      }
    })
  }
  return commonAttributes
}

function getElementAttributes(element: HTMLElement): ElementAttributes {
  const elementAttributes: ElementAttributes = {
    elementType: element.nodeName.toLowerCase(),
  }
  for (let i = 0; i < element.attributes.length; i++) {
    const key = element.attributes[i]?.name
    if (key == undefined) throw new Error('[2051207.1850] attribute has no name')
    const value = element.attributes[i]?.value ?? ''
    elementAttributes[key] = value
  }

  return elementAttributes
}
