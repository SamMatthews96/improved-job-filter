import Filter from '@/utils/filter'
import pageSelectors from '@/utils/pageSelectors.json'

const website = window.location.href.match(/^https?:\/\/[^\/]+\//)?.[0]
if (!website) throw new Error()

const key = website as keyof typeof pageSelectors

const selectors = pageSelectors[key]
if (selectors != undefined) {
  new Filter(selectors)
} else {
  console.warn(`[20251203.1438] could not find selectors for ${key} `)
}
