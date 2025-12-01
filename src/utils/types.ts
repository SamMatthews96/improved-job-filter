
type Manifest = chrome.runtime.Manifest

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
    getManifest(): Manifest;
    addStorageListener(callback: (...args: any) => void): void
}