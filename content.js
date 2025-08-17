chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const cssSelector = request.selector;

    if (request.action === "get_inner_html") {
        const dom = document.querySelectorAll(cssSelector);

        let htmlContentArray = [];
        dom.forEach((i) => {htmlContentArray.push(i.innerHTML)})

        sendResponse({ success: true, html: htmlContentArray });
    }
});
