
const enabledTabIds = []

chrome.runtime.onMessage.addListener((message) =>{
  console.log('background', message)
})
