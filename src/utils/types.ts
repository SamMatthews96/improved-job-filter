
export interface StoredData {
    blacklistedJobTitles: string[];
    blacklistedCompanies: string[];
}

export interface JobFieldSelectors {
    title: string;
    company: string;
}

export interface RuntimeAPI {
    set<T = { [key: string]: any }>(items: Partial<T>): Promise<void>
    get<T = { [key: string]: unknown }>(keys: Array<keyof T>): Promise<T>
    addStorageListener(callback: (...args: any) => void): void
    injectScript(): Promise<void>
    sendMessage(message: string, data?: object): void
    addEventListener(message: string, callback: (...args: any) => void): void
}

export type PageSelectors = {
  container: string;
  title: string;
  company: string;
}

