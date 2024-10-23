document.getElementById("get-sitemaps").addEventListener("click", () => {
  chrome.runtime.sendMessage({ message: "getSitemaps" }, (response) => {
    console.log("Sitemaps:", response);
    alert(`Found ${response.length} sitemaps.`);
  });
});

document.getElementById("save-sitemap").addEventListener("click", () => {
  const newSitemap = {
    id: Date.now(),
    name: "Test Sitemap",
    startUrl: ["https://example.com"],
    selectors: [{ id: "title", selector: "h1" }],
  };

  chrome.runtime.sendMessage(
    { message: "saveSitemap", data: newSitemap },
    (response) => {
      if (response.status === "success") {
        alert("Sitemap saved successfully!");
      }
    }
  );
});
