// Initialize default settings
let stats = { popups: 0, ads: 0 };

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    blockPopups: true,
    blockAds: true,
    blockCookie: true,
    blockAutoplay: true,
    stats: { popups: 0, ads: 0 }
  });
  stats = { popups: 0, ads: 0 };
});

// Load stats from storage on startup
chrome.storage.sync.get('stats', (result) => {
  if (result && result.stats) {
    stats = result.stats;
  } else {
    stats = { popups: 0, ads: 0 };
  }
});

// Reset stats at midnight
function resetStats() {
  stats = { popups: 0, ads: 0 };
  chrome.storage.sync.set({ stats });
}

// Check if it's midnight and reset stats if needed
function checkAndResetStats() {
  const now = new Date();
  if (now.getHours() === 0 && now.getMinutes() === 0) {
    resetStats();
  }
}

// Check every minute
setInterval(checkAndResetStats, 60000);

// Listen for messages from content script and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateSettings') {
    // Forward settings to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'updateSettings',
          blockPopups: request.blockPopups,
          blockAds: request.blockAds,
          blockCookie: request.blockCookie,
          blockAutoplay: request.blockAutoplay
        });
      }
    });
  } else if (request.action === 'incrementStats') {
    if (request.type === 'popup') stats.popups++;
    if (request.type === 'ad') stats.ads++;
  }
});

// Periodically save stats to storage (every 10 seconds)
setInterval(() => {
  chrome.storage.sync.set({ stats });
}, 10000); 