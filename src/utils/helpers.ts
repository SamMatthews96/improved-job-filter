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
  const fieldAncestors: HTMLElement[][] = fieldElements.map((fieldElement) =>
    getAncestorsBefore(fieldElement, container),
  )
  /*
    for each ancestors for...
    get elements in same position
    extract common attributes
  */
  // iterate over each parent
  const length = fieldAncestors[0]?.length as number
  for (let currentAncestor = 0; currentAncestor < length; currentAncestor++) {
    console.log(getCommonAttributes(fieldAncestors, fieldElements.length, currentAncestor))
  }

  return ''
}

function getCommonAttributes(
  fieldAncestors: HTMLElement[][],
  length: number,
  ancestor: number,
): ElementAttributes {
  const firstElement = fieldAncestors?.[0]?.[ancestor] as HTMLElement
  const commonAttributes: ElementAttributes = getElementAttributes(firstElement)
  // iterate over the equivalent elements
  for (let currentField = 1; currentField < length; currentField++) {
    const element = fieldAncestors?.[currentField]?.[ancestor]
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

function getAncestorsBefore(element: HTMLElement, ancestor: HTMLElement): HTMLElement[] {
  const ancestors: HTMLElement[] = []

  let currentElement: HTMLElement | null = element
  // find every ancestor of element until reaching ancestor
  while (currentElement != ancestor) {
    ancestors.push(currentElement)
    if (currentElement?.parentElement == null) {
      throw new Error('[20251207.1832] invalid ancestor provided')
    }
    currentElement = currentElement.parentElement
  }
  return ancestors
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
