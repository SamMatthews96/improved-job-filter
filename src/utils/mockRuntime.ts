import { EventEmitter } from 'eventemitter3'
import type { RuntimeAPI, StoredData } from './types'

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
    const keys = ['blacklistedJobTitles', 'blacklistedCompanies', 'websiteFilterCollection']
    const obj = {} as StoredData
    keys.forEach((key) => {
      const value = localStorage.getItem(String(key))
      if (value == null) {
        return
      }
      ;(obj as any)[key] = JSON.parse(value)
    })

    return Promise.resolve(obj)
  }

  addStorageListener(callback: (...args: any) => void): void {
    this.storageListeners.push(callback)
  }

  async injectScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // import('../script.ts')
      //   .then(() => resolve())
      //   .catch(err => reject(err))
    })
  }

  sendMessageToTab(message: string, data?: object): void {
    this.eventEmitter.emit(message, data)
  }

  sendMessageToService(message: string, data?: object): void {
    this.eventEmitter.emit(message, data)
  }

  addEventListener(message: string, callback: (...args: any) => void): void {
    this.eventEmitter.on(message, callback)
  }
}
