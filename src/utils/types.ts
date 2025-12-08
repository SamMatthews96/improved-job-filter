export interface StoredData {
  blacklistedJobTitles: string[]
  blacklistedCompanies: string[],
  websiteFilterCollection: WebsiteFilterCollection

}

//@todo fix anything broken by change to set/get changes
// use one class for stored data for now on
export interface RuntimeAPI {
  set(items: Partial<StoredData>): Promise<void>
  get(keys: Array<keyof StoredData>): Promise<Partial<StoredData>>
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
  selectedFilterId: number
  containerProperties: ElementPath,
  fieldProperties: {
    [fieldName: string] : ElementPath
  }
}

export type WebsiteFilterCollection = {
  [url: string]: WebsiteFilter
}
