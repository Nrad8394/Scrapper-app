import React, { useState, useEffect } from 'react';

function App() {
  const [sitemaps, setSitemaps] = useState([]);
  const [extensionInstalled, setExtensionInstalled] = useState(false);

  useEffect(() => {
    const checkExtension = () => {
      if (typeof window.chrome !== 'undefined' && window.chrome.runtime) {
        console.log("Extension detected in Chrome or Brave.");
        setExtensionInstalled(true);

        chrome.runtime.sendMessage(
          "igckaigpadbdfibmoijeegopoohlaalk", // Replace with your extension ID
          { message: "getSitemaps" },
          (response) => {
            if (chrome.runtime.lastError) {
              console.error("Error:", chrome.runtime.lastError.message);
            }

            if (response) {
              console.log("Sitemaps received from extension:", response);
              setSitemaps(response);
            } else {
              console.error("No response from the extension.");
            }
          }
        );
      } else {
        console.log("Chrome extension not available in this environment.");
      }
    };

    checkExtension();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Scrapper App</h1>
      </header>

      {!extensionInstalled ? (
        <div>
          <h2>Extension Not Installed</h2>
          <p>Please install the Local Scraper Extension to proceed.</p>
        </div>
      ) : (
        <div>
          <h2>Your Sitemaps</h2>
          {sitemaps.length === 0 ? (
            <p>No sitemaps found.</p>
          ) : (
            <ul>
              {sitemaps.map((sitemap, index) => (
                <li key={index}>{sitemap.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
