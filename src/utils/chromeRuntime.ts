import type { RuntimeAPI } from './types'

export default class ChromeRuntime implements RuntimeAPI {
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
    let queryOptions = { active: true, lastFocusedWindow: true }
    let [tab] = await chrome.tabs.query(queryOptions)
    if (!tab?.id) {
      console.error('[20251206.1625] could not get tab.id of tab;', tab)
      return
    }
    await chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        files: ['script.js'],
      })
  }
}
