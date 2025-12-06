import type { RuntimeAPI } from './types'

export default class ChromeRuntime implements RuntimeAPI {
  private currentTabId: number | undefined

  set<T = { [key: string]: any }>(items: Partial<T>): Promise<void> {
    const formattedData = {}
    Object.entries(items).forEach(([key, value]) => {
      Object.assign(formattedData, {
        [key]: JSON.stringify(value),
      })
    })
    return chrome.storage.local.set(formattedData)
  }

  async get<T = { [key: string]: unknown }>(keys: Array<keyof T>): Promise<T> {
    const res = await chrome.storage.local.get<T>(keys)
    const data = {} as T
    keys.forEach((key_1) => {
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

  async injectScript(): Promise<void> {
    await chrome.scripting.executeScript({
      target: { tabId: await this.getCurrentTabId() },
      files: ['script.js'],
    })
  }

  private async getCurrentTabId(): Promise<number> {
    if (this.currentTabId) return this.currentTabId
    let queryOptions = { active: true, lastFocusedWindow: true }
    let [tab] = await chrome.tabs.query(queryOptions)
    if (!tab?.id) {
      throw new Error('[20251206.1625] could not get tab.id of tab')
    }
    this.currentTabId = tab.id
    return tab.id
  }

  async sendMessageToTab(message: string, data?: object): Promise<void> {
    chrome.tabs.sendMessage(await this.getCurrentTabId(), {
      message,
      data,
    })
  }

  async sendMessageToService(message: string, data?: object): Promise<void> {
    await this.sendMessageToTab(message, data)
  }


  addEventListener(message: string, callback: (...args: any) => void): void {
    chrome.runtime.onMessage.addListener(
      (payload: {message: string, data: object}) => {
        if (message != payload.message) return;
        callback(payload.data)
      },
    )
  }
}
