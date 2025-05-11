// Common ad selectors
const adSelectors = [
  '[class*="ad-"]', '[class*="ads-"]', '[id*="ad-"]', '[id*="ads-"]',
  '[class*="banner"]', '[id*="banner"]',
  'iframe[src*="ad"]', 'iframe[src*="ads"]', 'iframe[src*="banner"]',
  'div[class*="sponsored"]', 'div[id*="sponsored"]',
  'div[class*="advertisement"]', 'div[id*="advertisement"]'
];

// Popup overlay/modal selectors
const popupSelectors = [
  '[class*="modal"]', '[class*="popup"]', '[class*="overlay"]',
  '[id*="modal"]', '[id*="popup"]', '[id*="overlay"]',
  'div[role="dialog"]', 'div[aria-modal="true"]',
  'div[style*="z-index"][style*="fixed"]',
  'div[style*="z-index"][style*="absolute"]'
];

// Cookie consent selectors
const cookieSelectors = [
  '[id*="cookie"]', '[class*="cookie"]', '[aria-label*="cookie"]', '[data-testid*="cookie"]',
  '[id*="consent"]', '[class*="consent"]', '[aria-label*="consent"]', '[data-testid*="consent"]'
];

// Auto-play video selectors
const autoPlaySelectors = [
  'video[autoplay]', 'video[muted][loop]', 'video[playsinline]'
];

let settings = {
  blockPopups: true,
  blockAds: true
};

// Load settings
chrome.storage.sync.get(['blockPopups', 'blockAds'], (result) => {
  settings = {
    blockPopups: result.blockPopups !== false,
    blockAds: result.blockAds !== false
  };
});

// Listen for settings updates
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateSettings') {
    settings = {
      blockPopups: request.blockPopups,
      blockAds: request.blockAds
    };
  }
  // Block element feature
  if (request.action === 'blockElementMode') {
    enableBlockElementMode();
  }
});

function hideElements(selectors, type) {
  document.querySelectorAll(selectors.join(',')).forEach(el => {
    // Chỉ ẩn nếu nó che phủ phần lớn màn hình (cho popup/modal)
    if (type === 'popup') {
      if (el.offsetWidth > window.innerWidth * 0.3 && el.offsetHeight > window.innerHeight * 0.3) {
        el.style.display = 'none';
        chrome.runtime.sendMessage({ action: 'incrementStats', type: 'popup' });
      }
    } else {
      el.style.display = 'none';
      chrome.runtime.sendMessage({ action: 'incrementStats', type });
    }
  });
}

function blockAutoPlayVideos() {
  document.querySelectorAll(autoPlaySelectors.join(',')).forEach(video => {
    video.pause();
    video.autoplay = false;
    video.muted = true;
    video.removeAttribute('autoplay');
    chrome.runtime.sendMessage({ action: 'incrementStats', type: 'ad' });
  });
}

// Block popups, ads, cookie banners, auto-play video
function blockAll() {
  if (settings.blockAds) {
    hideElements(adSelectors, 'ad');
  }
  if (settings.blockPopups) {
    hideElements(popupSelectors, 'popup');
    hideElements(cookieSelectors, 'popup');
    blockAutoPlayVideos();
  }
}

blockAll();

const observer = new MutationObserver(blockAll);
observer.observe(document.documentElement, { childList: true, subtree: true });

// Block element mode (manual)
function enableBlockElementMode() {
  document.body.style.cursor = 'crosshair';
  function handler(e) {
    e.preventDefault();
    e.stopPropagation();
    e.target.style.display = 'none';
    document.body.style.cursor = '';
    document.removeEventListener('click', handler, true);
    chrome.runtime.sendMessage({ action: 'incrementStats', type: 'ad' });
  }
  document.addEventListener('click', handler, true);
} 