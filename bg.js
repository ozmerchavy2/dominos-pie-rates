chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url.includes('dominos.ca') || tab.url.includes('dominos.com')) {
      if (tab.title.toLowerCase().includes('coupons')) {
        chrome.scripting.executeScript({
          target: { tabId },
          files: ['./main.js'],
        });
      
      }
    }
  
});




// Function to clean up expired data
// cache has expiery date to stay relevant
function cleanupData() {
    chrome.storage.local.get(null, (result) => {
      const currentTime = Date.now();
      for (const key in result) {
        if (result.hasOwnProperty(key)) {
          const item = result[key];
          if (item.expiresAt && item.expiresAt <= currentTime) {
            chrome.storage.local.remove(key);
          }
        }
      }
    });
  }
  
  chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.get("lastCleanupDate", (result) => {
      const lastCleanupDate = result.lastCleanupDate || 0; // Default to 0 if not set previously
      const today = new Date().toDateString();
  
      if (lastCleanupDate !== today) {
        cleanupData();
        chrome.storage.local.set({ lastCleanupDate: today });
      }
    });
  });
  


