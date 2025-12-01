import type { RuntimeAPI } from "./types";
import manifest from "@public/manifest.json"

type Manifest = chrome.runtime.Manifest

export default class MockRuntime implements RuntimeAPI {
    private storageListeners: Array<(...args: any) => void> = []

    set<T = { [key: string]: any }>(items: Partial<T>): Promise<void> {
        Object.entries(items).forEach(([key,value]) => {
            localStorage.setItem(String(key),JSON.stringify(value))
        })

        setTimeout(() => {
            this.storageListeners.forEach(listener => listener(items))
        }, 100)
        return Promise.resolve()
    }

    get<T = { [key: string]: unknown }>(keys: Array<keyof T>): Promise<T> {
        const obj = {} as T
        keys.forEach(key => {
            const value = localStorage.getItem(String(key));
            if (value == null){
                return;
            }
            (obj as any)[key] = JSON.parse(value);
        });

        return Promise.resolve(obj);
    }

    getManifest(): Manifest {
        return manifest as Manifest;
    }

    addStorageListener(callback: (...args: any) => void): void {
        this.storageListeners.push(callback)
    }
}