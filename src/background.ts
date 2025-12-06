import Runtime from '@/utils/runtime'

const enabledTabIds: number[] = []

Runtime.addEventListener('popupOpened', ({ tabId }) => {
  if (enabledTabIds.includes(tabId)) return

  enabledTabIds.push(tabId)
  Runtime.injectScript()
})
