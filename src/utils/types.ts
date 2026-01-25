
export interface RuntimeAPI {
  set(items: Partial<StoredData>): Promise<void>
  get(): Promise<Partial<StoredData>>
  addStorageListener(callback: (...args: any) => void): void
  injectScript(tabId: number): Promise<void>
  addEventListener(message: string, callback: (...args: any) => void): void
  sendMessageToService(message: string, data?: object): void
  sendMessageToTab(message: string, data?: object): void
  getCurrentTab(): Promise<chrome.tabs.Tab | undefined>
  addPageLoadListener(callback: (...args: any) => void): void
}

export interface StoredData {
  filterProfileSettings: FilterProfileSettings
  websiteFilterSettings: WebsiteFilterSettings
}

// #region WebsiteFilterSettings

export type WebsiteFilterSettings = {
  [url: string]: WebsiteFilter
}

export type WebsiteFilter = {
  selectedFilterId?: string
  containerProperties?: ElementPath,
  fieldProperties: {
    [fieldName: string]: ElementPath | null
  }
}

export type ElementPath = ElementProperties[]

export type ElementProperties = {
  elementType: string
  nthChild: string
  attributes: { [key: string]: string }
}

// #endregion

// #region FilterProfileSettings

export type FilterProfileSettings = {
  selectedFilterId: string | undefined,
  profiles: {
    [name: string]: FilterProfile
  }
}

export type FilterProfile = {
  fieldNames: string[]
  filter: FilterCollection
}

export type Filter = SingleFilter | FilterCollection

export type SingleFilter = {
  filterType: 'single'
  fieldName: string
  isInverted: boolean
  isWholeWordOnly: boolean
  fieldValue: string
}

export type FilterCollection = {
  filterType: 'collection'
  collectionType: FilterCollectionType
  subFilters: Filter[]
}

export type FilterCollectionType = 'every' | 'any'


// #endregion
