import type { RuntimeAPI } from "./types";

export default class ChromeRuntime implements RuntimeAPI {
    set<T = { [key: string]: any }>(items: Partial<T>): Promise<void> {
        return chrome.storage.local.set<T>(items)
    }

    get<T = { [key: string]: unknown }>(keys: Array<keyof T>): Promise<T> {
        return chrome.storage.local.get<T>(keys)
    }

    getManifest(): chrome.runtime.Manifest {
        return chrome.runtime.getManifest()
    }

    addStorageListener(callback: (...args: any) => void): void {
        chrome.storage.local.onChanged.addListener(callback)
    }
}