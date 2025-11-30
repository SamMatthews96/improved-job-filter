console.log('test working', window.location.href)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "greet") {
        
    }
})