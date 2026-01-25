import { toRaw } from 'vue'
import { getElementWithPath } from './elementFunctions'
import type { Filter, FilterCollection, FilterProfile, SingleFilter, WebsiteFilter } from './types'

// true means show, false means hide
export function doesElementMatchFilter(
  element: HTMLElement,
  websiteFilter: WebsiteFilter,
  filterProfile: FilterProfile,
): boolean {
  const fieldPropertyArray = Object.entries(websiteFilter.fieldProperties).filter(
    ([_, value]) => value,
  )
  const fieldValues: { [str: string]: string } = {}
  fieldPropertyArray.forEach(([fieldName, elementPath]) => {
    const fieldElement = getElementWithPath(elementPath!, element)
    if (!fieldElement) return
    fieldValues[fieldName] = fieldElement.innerText
  })

  // console.log('filter test')
  // console.log(toRaw(fieldValues))
  return checkCollectionFilter(fieldValues, filterProfile.filter)
}

function checkFilter(fieldValues: { [str: string]: string }, filter: Filter) {
  switch (filter.filterType) {
    case 'collection':
      return checkCollectionFilter(fieldValues, filter)
    case 'single':
      return checkSingleFilter(fieldValues, filter)
  }
}

export function checkCollectionFilter(
  fieldValues: { [str: string]: string },
  filter: FilterCollection,
): boolean {
  switch (filter.collectionType) {
    case 'every':
      return filter.subFilters.every((subFilter) => checkFilter(fieldValues, subFilter))
    case 'any':
      return filter.subFilters.some((subFilter) => checkFilter(fieldValues, subFilter))
  }
}

function checkSingleFilter(fieldValues: { [str: string]: string }, filter: SingleFilter) {
  const fieldValue = fieldValues[filter.fieldName]?.toLowerCase()
  const filterValue = filter.fieldValue?.toLowerCase()

  if (!fieldValue || !filterValue) return true

  let match: boolean
  if (filter.isWholeWordOnly) {
    match = fieldValue.split(/[ ,/]+/).includes(filterValue)
  } else {
    match = fieldValue.includes(filterValue)
  }

  if (filter.isInverted) {
    match = !match
  }
  return match
}
