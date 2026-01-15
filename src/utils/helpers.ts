import type { ElementProperties, ElementPath } from './types'

//@todo should commonparent be able to get common parent of many
function getCommonParent(node1: HTMLElement, node2: HTMLElement): HTMLElement | null {
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

function getElementWithText(text: string): HTMLElement | null {
  const lower = text.toLowerCase()
  const xpath = `//*[not(self::script or self::style)
      and translate(text(),
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'abcdefghijklmnopqrstuvwxyz'
  )='${lower}']`
  let match = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    .singleNodeValue as HTMLElement | null
  if (!match) {
    const xpathContains = `//*[not(self::script or self::style)
      and contains(
      translate(text(),
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        'abcdefghijklmnopqrstuvwxyz'
      ),
      '${lower}'
    )]`
    match = document.evaluate(xpathContains, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
      .singleNodeValue as HTMLElement | null
  }
  return match
}

// use for getting search-results container
function getUniqueElementPath(element: HTMLElement): ElementPath {
  const attributes: ElementProperties[] = []
  let current: HTMLElement | null = element
  while (current) {
    const currentElementProperties = getElementProperties(current)
    attributes.push(currentElementProperties)
    if (currentElementProperties.attributes.id) {
      break
    }
    current = current.parentElement
  }
  return attributes

  //@todo may need a function to verify that this is unique
  // although, it should be unique regardless:
  // it searches until it gets
}

// probably use during getUniqueRelativeSelector
function getCommonProperties(fieldElements: HTMLElement[]): ElementProperties {
  const firstElement = fieldElements[0] as HTMLElement
  const commonProperties: ElementProperties = getElementProperties(firstElement)
  // iterate over the equivalent elements
  for (let i = 1; i < fieldElements.length; i++) {
    const element = fieldElements[i]!
    const elementProperties = getElementProperties(element)
    if (commonProperties.elementType != elementProperties.elementType) {
      throw new Error('[20251208.1605]')
    }
    if (commonProperties.nthChild != elementProperties.nthChild) {
      commonProperties.nthChild = ''
    }

    Object.keys(commonProperties.attributes).forEach((key) => {
      if (elementProperties.attributes[key] == undefined) {
        delete commonProperties.attributes[key]
      } else {
        if (elementProperties.attributes[key] != commonProperties.attributes[key]) {
          delete commonProperties.attributes[key]
        }
      }
    })
  }
  return commonProperties
}

// gets the css selectors of an element in isolation
function getElementProperties(element: HTMLElement): ElementProperties {
  const elementType = element.nodeName.toLowerCase()
  const nthChild = element.parentElement
    ? (() => {
      for (let i = 0; i < element.parentElement.children.length; i++) {
        if (element.parentElement.children[i] == element) {
          return (i + 1).toString()
        }
      }
      return ''
    })()
    : ''

  const elementProperties: ElementProperties = {
    elementType,
    nthChild,
    attributes: {},
  }
  for (let i = 0; i < element.attributes.length; i++) {
    const key = element.attributes[i]?.name
    if (key == undefined) throw new Error('[2051207.1850] attribute has no name')
    const value = element.attributes[i]?.value ?? ''
    elementProperties.attributes[key] = value
  }

  return elementProperties
}

// used to identify "packed" selector path to get field of a search item
function getUniqueRelativeElementPaths(
  fieldElements: HTMLElement[],
  container: HTMLElement,
): ElementPath {
  let currentElements = fieldElements
  const attributeList: ElementPath = []

  while (currentElements[0] != container) {
    const attributes = getCommonProperties(currentElements)
    attributeList.push(attributes)
    currentElements = currentElements.map((e) => e.parentElement) as HTMLElement[]
    if (!currentElements[0]) throw new Error('[20251208.0041]')
  }

  const isValid = currentElements.every((element) => element == container)
  if (!isValid) {
    throw new Error('[20251208.1436]')
  }

  return attributeList
}

function createSelector(path: ElementPath): string {
  return path
    .map((properties, i) => {
      let selectorFragment = `${properties.elementType}`
      if (i < path.length - 1) {
        selectorFragment += `:nth-child(${properties.nthChild})`
      } else {
        Object.entries(properties.attributes).forEach(([key, value]) => {
          if (key == 'style') return
          if (key == 'class' && value == '') return
          selectorFragment += `[${key}="${value}"]`
        })
      }

      return selectorFragment
    })
    .reverse()
    .join(' > ')
}

function identifyContainerAndTitlePaths(textValues: string[]): {
  containerPath: ElementPath
  titlePath: ElementPath
} {
  const matches = textValues.map(getElementWithText)
  if (matches.some((match) => !match)) throw new Error('[20251208.1802]')
  matches as HTMLElement[]
  if (!matches[0] || !matches[1]) throw new Error('[20251208.1804]')

  const commonParent = getCommonParent(matches[0], matches[1])
  if (!commonParent) throw new Error('[20251208.1804]')

  const containerPath = getUniqueElementPath(commonParent)
  const titlePath = getUniqueRelativeElementPaths(matches as HTMLElement[], commonParent)

  return {
    containerPath,
    titlePath,
  }
}

function identifyFieldChildPath(
  containerPath: ElementPath, fieldValue: string): ElementPath | undefined {
  if (fieldValue == '') return
  const fieldElement = getElementWithText(fieldValue)
  if (!fieldElement) return

  const container = getElementWithPath(containerPath)
  if (!container) {
    throw new Error('[20260110.2309]')
  }

  return getUniqueRelativeElementPath(fieldElement, container)
}

function getUniqueRelativeElementPath(
  fieldElement: HTMLElement,
  container: HTMLElement,
): ElementPath | undefined {
  let currentElement = fieldElement
  const attributeList: ElementPath = []

  while (currentElement != container) {
    const attributes = getElementProperties(currentElement)
    attributeList.push(attributes)
    currentElement = currentElement.parentElement as HTMLElement
    if (!currentElement) return
  }

  const isValid = currentElement == container
  if (!isValid) {
    throw new Error('[20251208.1436]')
  }

  return attributeList
}

function getElementWithPath(path: ElementPath, parent: HTMLElement | null = null)
  : HTMLElement | undefined {
  const element = parent ? parent : document
  const selector = createSelector(path)
  const matches = element.querySelectorAll(selector)
  switch (matches.length) {
    case 0:
      return undefined
    case 1:
      return matches[0] as HTMLElement
    default:
      throw new Error('[20260110.2311]')
  }
}

function getWindowUrl(): string {
  return (window.location.href).match(/^https?:\/\/[^\/]+\//)![0]
}

export {
  identifyContainerAndTitlePaths,
  identifyFieldChildPath,
  getWindowUrl,
  getElementWithPath,
  getCommonProperties
}