export interface StoredData {
  blacklistedJobTitles: string[]
  blacklistedCompanies: string[],
  websiteFilterCollection: WebsiteFilterCollection

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
  selectedFilterId: number
  containerProperties: ElementPath,
  fieldProperties: {
    [fieldName: string] : ElementPath
  }
}

export type WebsiteFilterCollection = {
  [url: string]: WebsiteFilter
}
