chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === "post_inner_html_to_server") {
        const postUrl = request.url;
        const htmlContent = request.html;

        try {
            const response = await fetch(postUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url: request.tabUrl,
                    html: htmlContent
                })
            });

            if (response.ok) {
                console.log('HTTP Post 成功！');
                sendResponse({ success: true, message: 'Data posted successfully!' });
            } else {
                console.error('HTTP Post 失敗:', response.statusText);
                sendResponse({ success: false, message: `HTTP error: ${response.status}` });
            }
        } catch (error) {
            console.error('發送請求時發生錯誤:', error);
            sendResponse({ success: false, message: `Request failed: ${error.message}` });
        }

        return true;
    }
});
