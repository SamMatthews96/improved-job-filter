
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updatedConfig") {
        console.log(request.message)
        sendResponse({ status: "success", message: `success` });
    }
})