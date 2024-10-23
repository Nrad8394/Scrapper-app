chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "getSitemaps") {
    chrome.storage.local.get("sitemaps", (result) => {
      sendResponse(result.sitemaps || []);
    });
    return true;
  }
});
