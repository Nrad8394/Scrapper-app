chrome.runtime.onInstalled.addListener(() => {
  console.log("Scraper Extension Installed");
});

// Listen for messages from the popup or React app
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  if (request.message === "getSitemaps") {
    // Simulate sitemap retrieval (replace with actual storage retrieval logic)
    chrome.storage.local.get("sitemaps", (result) => {
      sendResponse(result.sitemaps || []); // Respond with the sitemaps
    });
    return true; // Required to keep the message channel open for async response
  }

  if (request.message === "saveSitemap") {
    // Save a new sitemap to local storage
    chrome.storage.local.get("sitemaps", (result) => {
      const sitemaps = result.sitemaps || [];
      sitemaps.push(request.data); // Push new sitemap to array
      chrome.storage.local.set({ sitemaps }, () => {
        sendResponse({ status: "success" });
      });
    });
    return true; // Required to keep the message channel open for async response
  }
});
