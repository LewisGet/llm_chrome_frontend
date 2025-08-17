chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "get_inner_html") {
        const htmlContent = document.body.innerHTML;
        sendResponse({ success: true, html: htmlContent });
    }
});
