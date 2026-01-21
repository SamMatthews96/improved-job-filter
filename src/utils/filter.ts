import { toRaw } from "vue";
import { getElementWithPath } from "./elementFunctions";
import type { Filter, FilterCollection, SingleFilter, WebsiteFilter } from "./types";

// true means show, false means hide
export function doesElementMatchFilter(
    element: HTMLElement,
    websiteFilter: WebsiteFilter,
    filterProfile: FilterCollection
): boolean {
    const fieldPropertyArray = Object.entries(websiteFilter.fieldProperties)
        .filter(([_, value]) => value)
    const fieldValues: { [str: string]: string } = {}
    fieldPropertyArray.forEach(([fieldName, elementPath]) => {
        const fieldElement = getElementWithPath(elementPath!, element)
        if (!fieldElement) return
        fieldValues[fieldName] = fieldElement.innerText
    })

    console.log('filter test')
    console.log(toRaw(fieldValues))
    return checkCollectionFilter(fieldValues, filterProfile)
}

function checkFilter(
    fieldValues: { [str: string]: string },
    filter: Filter
) {
    switch (filter.filterType) {
        case 'collection':
            return checkCollectionFilter(fieldValues, filter)
        case 'single':
            return checkSingleFilter(fieldValues, filter)
    }
}

export function checkCollectionFilter(
    fieldValues: { [str: string]: string },
    filter: FilterCollection
): boolean {

    switch (filter.collectionType) {
        case 'all':
            return filter.subFilters.every(subFilter =>
                checkFilter(fieldValues, subFilter)
            )
        case 'any':
            return filter.subFilters.some(subFilter =>
                checkFilter(fieldValues, subFilter)
            )
    }
}

function checkSingleFilter(
    fieldValues: { [str: string]: string },
    filter: SingleFilter
) {
    const fieldValue = fieldValues[filter.fieldName]
    

    switch (filter.comparisonType) {
        case 'contains keyword':
            return doesFieldContainKeyword(filter.fieldValue,fieldValue)
        case 'contains string':
            return fieldValue?.includes(filter.fieldValue)
        case 'doesn\'t contain keyword':
            return !doesFieldContainKeyword(filter.fieldValue,fieldValue)
        case 'doesn\'t contain string':
            return !fieldValue?.includes(filter.fieldValue)
        default:

    }
    return true
}

function doesFieldContainKeyword(filterValue: string, fieldValue: string | undefined){
    if (!fieldValue) return false
    const fieldWords = fieldValue.toLowerCase().split(/[ ,/]+/)
    return fieldWords.includes(filterValue.toLowerCase())
}
