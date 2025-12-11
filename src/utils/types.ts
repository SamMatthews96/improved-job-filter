export interface StoredData {
  filterProfileSettings: FilterProfileSettings
  websiteFilterSettings: WebsiteFilterSettings
}

export interface RuntimeAPI {
  set(items: Partial<StoredData>): Promise<void>
  get(): Promise<Partial<StoredData>>
  addStorageListener(callback: (...args: any) => void): void
  injectScript(): Promise<void>
  addEventListener(message: string, callback: (...args: any) => void): void
  sendMessageToService(message: string, data?: object): void
  sendMessageToTab(message: string, data?: object): void
}

export type PageSelectors = {
  container: string
  title: string
  company: string
}

export type ElementProperties = {
  elementType: string
  nthChild: string
  attributes: { [key: string]: string }
}

export type ElementPath = ElementProperties[]

export type WebsiteFilter = {
  selectedFilterId: string | undefined
  containerProperties: ElementPath,
  fieldProperties: {
    [fieldName: string]: ElementPath
  }
}

export type FilterField = {
  blacklistKeywords: string
}

export type FilterFieldList = {
  name: string
  field: FilterField
}[]

export type FilterProfileList = {
  name: string,
  filterProfile: FilterProfile
}[]

export type FilterProfile = {
  [name: string]: FilterField
}

export type FilterProfileSettings = {
  selectedFilterId: string | undefined,
  profiles: {
    [name: string]: FilterProfile
  }
}

export type WebsiteFilterSettings = {
  [url: string]: WebsiteFilter
}
