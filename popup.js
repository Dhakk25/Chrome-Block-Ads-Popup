document.addEventListener('DOMContentLoaded', function() {
  const popupToggle = document.getElementById('popupToggle');
  const adToggle = document.getElementById('adToggle');
  const popupCount = document.getElementById('popupCount');
  const adCount = document.getElementById('adCount');
  const siteToggle = document.getElementById('siteToggle');
  const pageToggle = document.getElementById('pageToggle');
  const cookieToggle = document.getElementById('cookieToggle');
  const autoplayToggle = document.getElementById('autoplayToggle');
  const blockElementBtn = document.getElementById('blockElementBtn');

  // Load saved settings
  chrome.storage.sync.get(['blockPopups', 'blockAds', 'stats', 'blockCookie', 'blockAutoplay'], function(result) {
    popupToggle.checked = result.blockPopups !== false;
    adToggle.checked = result.blockAds !== false;
    cookieToggle.checked = result.blockCookie !== false;
    autoplayToggle.checked = result.blockAutoplay !== false;
    // Site/page toggle: default on
    siteToggle.checked = true;
    pageToggle.checked = true;
    if (result.stats) {
      updateStats(result.stats);
    }
  });

  // Save settings when toggled
  popupToggle.addEventListener('change', function() {
    chrome.storage.sync.set({ blockPopups: popupToggle.checked });
    chrome.runtime.sendMessage({ action: 'updateSettings', blockPopups: popupToggle.checked });
  });
  adToggle.addEventListener('change', function() {
    chrome.storage.sync.set({ blockAds: adToggle.checked });
    chrome.runtime.sendMessage({ action: 'updateSettings', blockAds: adToggle.checked });
  });
  cookieToggle.addEventListener('change', function() {
    chrome.storage.sync.set({ blockCookie: cookieToggle.checked });
    chrome.runtime.sendMessage({ action: 'updateSettings', blockCookie: cookieToggle.checked });
  });
  autoplayToggle.addEventListener('change', function() {
    chrome.storage.sync.set({ blockAutoplay: autoplayToggle.checked });
    chrome.runtime.sendMessage({ action: 'updateSettings', blockAutoplay: autoplayToggle.checked });
  });
  // Block element manual
  blockElementBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (chrome.runtime.lastError) return;
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'blockElementMode' }, function() {
          if (chrome.runtime.lastError) {
            // Không có service worker, bỏ qua lỗi
            return;
          }
        });
      }
    });
  });

  // Update stats with animation
  function updateStats(stats) {
    animateValue(popupCount, 0, stats.popups || 0, 500);
    animateValue(adCount, 0, stats.ads || 0, 500);
  }

  // Animate number counting
  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value.toLocaleString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // Listen for stats updates
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'updateStats') {
      updateStats(request.stats);
    }
  });

  // Xử lý lỗi icon: nếu không load được thì thay bằng icon16.png
  document.querySelectorAll('.feature-icon').forEach(function(img) {
    img.addEventListener('error', function() {
      this.src = 'icons/icon16.png';
    });
  });
}); 