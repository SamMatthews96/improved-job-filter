import type { RuntimeAPI, StoredData } from './types'

export default class ChromeRuntime implements RuntimeAPI {

  set(items: Partial<StoredData>): Promise<void> {
    const formattedData = {}
    Object.entries(items).forEach(([key, value]) => {
      Object.assign(formattedData, {
        [key]: JSON.stringify(value),
      })
    })
    return chrome.storage.local.set(formattedData)
  }

  async get(): Promise<Partial<StoredData>> {
    const keys: (keyof StoredData)[] = [
      'filterProfileSettings', 'websiteFilterSettings'
    ]
    const res: Partial<StoredData> = await chrome.storage.local.get<StoredData>(keys)
    const data = {} as StoredData
    keys.forEach((key_1) => {
      if (!res[key_1]) return;
      const value = JSON.parse(String(res[key_1]))
      data[key_1] = value
    })
    return data
  }

  addStorageListener(callback: (...args: any) => void): void {
    chrome.storage.local.onChanged.addListener((arg) => {
      const data = {}
      Object.entries(arg).forEach(([key, value]) => {
        Object.assign(data, { [key]: JSON.parse(String(value.newValue)) })
      })
      callback(data)
    })
  }

  addEventListener(message: string, callback: (...args: any) => void): void {
    chrome.runtime.onMessage.addListener(
      (payload: { message: string, data: object }) => {
        if (message != payload.message) return;
        callback(payload.data)
      },
    )
  }

  addPageLoadListener(callback: (...args: any) => void): void {
    chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
      if (changeInfo.status !== 'complete') return;
      callback(tabId)
    })
  }

  async injectScript(tabId: number): Promise<void> {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ['script.js'],
    })
  }

  public async getCurrentTab(): Promise<chrome.tabs.Tab | undefined> {
    let queryOptions = { active: true, lastFocusedWindow: true }
    let [tab] = await chrome.tabs.query(queryOptions)
    if (!tab) {
      return
    }
    return tab
  }

  async sendMessageToTab(message: string, data?: object): Promise<void> {
    const tab = await this.getCurrentTab()
    if (!tab?.id) {
      throw new Error('[20260111.2209]')
    }
    chrome.tabs.sendMessage(tab.id, {
      message,
      data,
    }).catch((err) => {
      console.warn(err)
    })
  }

  async sendMessageToService(message: string, data?: object): Promise<void> {
    chrome.runtime.sendMessage({
      message,
      data,
    }).catch((err) => {
      console.warn(err)
    })
  }

}
