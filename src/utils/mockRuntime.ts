import type { RuntimeAPI } from "./types";
type Manifest = chrome.runtime.Manifest

export default class MockRuntime implements RuntimeAPI {
    private storageListeners: Array<(...args: any) => void> = []

    set<T = { [key: string]: any }>(items: Partial<T>): Promise<void> {
        setTimeout(() => {
            this.storageListeners.forEach(listener => listener(items))
        }, 100)
        return Promise.resolve()
    }

    get<T = { [key: string]: unknown }>(keys: Array<keyof T>): Promise<T> {
        return Promise.reject()
    }

    getManifest(): Manifest {
        return {
            manifest_version: 3,
            name: 'mock manifest',
            version: '1.0.0'
        }
    }

    addStorageListener(callback: (...args: any) => void): void {
        this.storageListeners.push(callback)
    }
}