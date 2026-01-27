import Runtime from '@/utils/runtime'
import { state } from '@/utils/state';

Runtime.addEventListener('enableCurrentPage', ({ tab }) => {
  if (!tab.url) throw new Error('[20260111.2319]')
  const url = tab.url.match(/^https?:\/\/[^\/]+\//)![0]
  if (state.websiteFilterSettings[url]) return;

  Runtime.injectScript(tab.id)

  state.websiteFilterSettings[url] = {
    fieldProperties: {}
  }
})

Runtime.addPageLoadListener(async (tabId) => {
  const tab = await Runtime.getCurrentTab()
  if (!tab?.url) return;
  const url = tab.url.match(/^https?:\/\/[^\/]+\//)![0]
  if (!state.websiteFilterSettings[url]) return;
  Runtime.injectScript(tabId)
})


