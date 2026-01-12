import Runtime from '@/utils/runtime'
import { state } from '@/utils/state';

// inject script is two scenarios

// 1: The popup button to approve website was clicked
Runtime.addEventListener('enableCurrentPage', ({ tab }) => {
  console.log('click', tab, state)
  if (!tab.url) throw new Error('[20260111.2319]')
  if (state.websiteFilterSettings[tab.url]) return;

  Runtime.injectScript(tab.id)

  const url = tab.url.match(/^https?:\/\/[^\/]+\//)![0]
  state.websiteFilterSettings[url] = {
    fieldProperties: {}
  }
})

// 2: loading a new page, which is already an approved site
Runtime.addPageLoadListener(async (tabId) => {
  const tab = await Runtime.getCurrentTab()
  console.log('pageload', tab, state)
  if (!tab.url) throw new Error('[20260111.2307]')
  if (!state.websiteFilterSettings[tab.url]) return;
  Runtime.injectScript(tabId)
})


