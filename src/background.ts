
function sayHello(name: string) {
    return `Hey ${name}, the background says Hello!`;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "greet") {
        sendResponse({ status: "success", message: `${sayHello(request.message.name)}` });
    }
})