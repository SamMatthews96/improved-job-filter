import { toRaw } from "vue";
import { getElementWithPath } from "./elementFunctions";
import type { FilterProfile, WebsiteFilter } from "./types";

// true means show, false means hide
export function doesElementMatchFilter(
    element: HTMLElement,
    websiteFilter: WebsiteFilter,
    filterProfile: FilterProfile
): boolean {
    const fieldPropertyArray = Object.entries(websiteFilter.fieldProperties)
        .filter(([_, value]) => value)
    const fieldValues: { [str: string]: string } = {}
    fieldPropertyArray.forEach(([fieldName, elementPath]) => {
        const fieldElement = getElementWithPath(elementPath!, element)
        if (!fieldElement) return
        fieldValues[fieldName] = fieldElement.innerText
    })

    return basicBlacklistFilter(fieldValues, filterProfile)
}

function basicBlacklistFilter(
    fieldValues: { [str: string]: string },
    filterProfile: FilterProfile
): boolean {
    let isMatch = true
    Object.entries(filterProfile).forEach(([fieldName, filterField]) => {
        if (!isMatch) return
        const fieldValue = fieldValues[fieldName]
        if (!fieldValue) return;
        const fieldWords = fieldValue.toLowerCase().split(/[ ,/]+/)
        const blacklistWords = filterField.blacklistKeywords.split(' ')
        isMatch = !blacklistWords.some(fieldWord => 
            fieldWords.includes(fieldWord)
        )
    })
    return isMatch
}