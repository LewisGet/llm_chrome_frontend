document.addEventListener('DOMContentLoaded', () => {
    const postButton = document.getElementById('execute');
    const postUrlDom = document.getElementById('post_url');
    const statusDiv = document.getElementById('status');

    postButton.addEventListener('click', () => {
        const postUrl = postUrlDom.value;
        if (!postUrl)
        {
            statusDiv.textContent = "missing url";
            statusDiv.style.color = "red";
            return;
        }

        statusDiv.textContent = "sending...";
        statusDiv.style.color = "black";

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTabId = tabs[0].id;
            const currentTabUrl = tabs[0].url;

            // to get content
            chrome.tabs.sendMessage(currentTabId, { action: "get_inner_html" }, (response) => {
                if (response && response.success) {
                    const htmlContent = response.html;

                    // send to background
                    chrome.runtime.sendMessage({
                        action: "post_inner_html_to_server",
                        url: postUrl,
                        html: htmlContent,
                        tabUrl: currentTabUrl
                    }, (backgroundResponse) => {
                        // background respond
                        if (backgroundResponse && backgroundResponse.success) {
                            statusDiv.textContent = "done";
                            statusDiv.style.color = "green";
                        } else {
                            statusDiv.textContent = "error" + (backgroundResponse.message || '');
                            statusDiv.style.color = "red";
                        }
                    });
                } else {
                    statusDiv.textContent = "wut? none content tab?";
                    statusDiv.style.color = "red";
                }
            });
        });
    });
});
