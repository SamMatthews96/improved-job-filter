import { EventEmitter } from 'eventemitter3'
import type { RuntimeAPI, StoredData } from './types'
import { getWindowUrl } from './elementFunctions';

export default class MockRuntime implements RuntimeAPI {
  private storageListeners: Array<(...args: any) => void> = []
  private eventEmitter: EventEmitter = new EventEmitter();

  set(items: Partial<StoredData>): Promise<void> {
    Object.entries(items).forEach(([key, value]) => {
      localStorage.setItem(String(key), JSON.stringify(value))
    })

    setTimeout(() => {
      this.storageListeners.forEach((listener) => listener(items))
    }, 100)
    return Promise.resolve()
  }

  get(): Promise<Partial<StoredData>> {
    const keys: (keyof StoredData)[] = ['filterProfileSettings', 'websiteFilterSettings']
    const obj = {} as StoredData
    keys.forEach((key) => {
      const value = localStorage.getItem(String(key))
      if (value == null) {
        return
      }
      ; (obj as any)[key] = JSON.parse(value)
    })

    return Promise.resolve(obj)
  }

  addStorageListener(callback: (...args: any) => void): void {
    this.storageListeners.push(callback)
  }

  addEventListener(message: string, callback: (...args: any) => void): void {
    this.eventEmitter.on(message, callback)
  }

  addPageLoadListener(callback: (...args: any) => void): void {
    window.setTimeout(() => {
      callback(1)
    }, 1000)
  }

  async injectScript(tabId: number): Promise<void> {
    // So far, I haven't needed to mock the injectScript functionality
  }

  async getCurrentTab(): Promise<chrome.tabs.Tab> {
    return {
      "active": true,
      "audible": true,
      "autoDiscardable": true,
      "discarded": false,
      "frozen": false,
      "groupId": -1,
      "highlighted": true,
      "id": 1,
      "incognito": false,
      "index": 1,
      "pinned": false,
      "selected": true,
      "windowId": 1612133047,
      url: getWindowUrl()
    }
  }

  sendMessageToTab(message: string, data?: object): void {
    this.eventEmitter.emit(message, data)
  }

  sendMessageToService(message: string, data?: object): void {
    this.eventEmitter.emit(message, data)
  }
}
