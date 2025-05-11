# Popup & Ad Blocker Chrome Extension

**(English below - Tiếng Việt phía trên)**

---

## 🇻🇳 Tiếng Việt

**Popup & Ad Blocker** là extension cho Chrome (hỗ trợ cả desktop và mobile) giúp chặn popup, quảng cáo, cookie banner, auto-play video và các overlay phiền nhiễu trên mọi website. Giao diện hiện đại, thân thiện, lấy cảm hứng từ iOS 18.

### 🚀 Tính năng nổi bật
- Chặn popup (cửa sổ nổi, overlay, modal)
- Chặn quảng cáo (banner, iframe, sponsored, v.v.)
- Chặn cookie consent/banner
- Chặn video tự động phát (auto-play)
- Chặn phần tử thủ công (Block element)
- Bật/tắt chặn cho từng website hoặc từng trang
- Thống kê số lượng popup/quảng cáo đã bị chặn
- Giao diện hiện đại, tối ưu cho cả desktop và mobile
- Nút donate hỗ trợ tác giả

### 🖼️ Giao diện
![Popup & Ad Blocker UI](screenshot.png)

### 🛠️ Cài đặt thủ công
1. Clone hoặc tải về repo này
2. Vào `chrome://extensions/` trên Chrome
3. Bật chế độ Developer mode (Chế độ nhà phát triển)
4. Chọn “Load unpacked” (Tải tiện ích chưa đóng gói)
5. Chọn thư mục dự án này

### 📦 Cấu trúc thư mục
```
popup-block-extension/
├── background.js
├── content.js
├── manifest.json
├── popup.html
├── popup.js
├── README.md
└── icons/
    ├── icon16.png
    ├── icon48.png
    ├── icon128.png
    ├── website.png
    ├── page.png
    ├── advertisement-page.png
    ├── popup.png
    ├── cookie.png
    └── auto-play.png
```

### ⚙️ Thông số & công nghệ
- Manifest Version: 3
- Ngôn ngữ: JavaScript, HTML, CSS
- API sử dụng: Chrome Extension API (storage, tabs, scripting, webNavigation)
- Tương thích: Chrome Desktop, Chrome Mobile (Android)

### 💡 Hướng dẫn sử dụng
- Click vào icon extension để mở popup.
- Bật/tắt các tính năng chặn theo ý muốn.
- Sử dụng nút “Block element” để tự chọn phần tử muốn ẩn trên trang.
- Xem thống kê số lượng popup/quảng cáo đã bị chặn.
- Ủng hộ tác giả qua nút Donate.

### ☕ Donate
Nếu bạn thấy extension hữu ích, hãy ủng hộ mình tại:  
[https://buymeacoffee.com/trucao](https://buymeacoffee.com/trucao)

### 🤝 Đóng góp
- Pull request, issue, góp ý đều được chào đón!
- Vui lòng đảm bảo code rõ ràng, có chú thích.

---

## 🇬🇧 English

**Popup & Ad Blocker** is a Chrome extension (supports both desktop and mobile) that blocks popups, ads, cookie banners, auto-play videos, and annoying overlays on any website. Modern, user-friendly interface inspired by iOS 18.

### 🚀 Features
- Block popups (modal, overlay, floating windows)
- Block ads (banner, iframe, sponsored, etc.)
- Block cookie consent/banner
- Block auto-play videos
- Manual element blocking (Block element)
- Enable/disable blocking per website or per page
- Statistics for blocked popups/ads
- Modern UI, optimized for both desktop and mobile
- Donate button to support the author

### 🖼️ UI Preview
![Popup & Ad Blocker UI](screenshot.png)

### 🛠️ Manual Installation
1. Clone or download this repository
2. Go to `chrome://extensions/` in Chrome
3. Enable Developer mode
4. Click “Load unpacked”
5. Select this project folder

### 📦 Folder Structure
```
popup-block-extension/
├── background.js
├── content.js
├── manifest.json
├── popup.html
├── popup.js
├── README.md
└── icons/
    ├── icon16.png
    ├── icon48.png
    ├── icon128.png
    ├── website.png
    ├── page.png
    ├── advertisement-page.png
    ├── popup.png
    ├── cookie.png
    └── auto-play.png
```

### ⚙️ Specs & Technology
- Manifest Version: 3
- Language: JavaScript, HTML, CSS
- Uses: Chrome Extension API (storage, tabs, scripting, webNavigation)
- Compatible: Chrome Desktop, Chrome Mobile (Android)

### 💡 Usage
- Click the extension icon to open the popup.
- Toggle blocking features as you wish.
- Use the “Block element” button to manually hide any element on the page.
- View statistics of blocked popups/ads.
- Support the author via the Donate button.

### ☕ Donate
If you find this extension helpful, please support me at:  
[https://buymeacoffee.com/trucao](https://buymeacoffee.com/trucao)

### 🤝 Contributing
- Pull requests, issues, and suggestions are welcome!
- Please keep code clear and well-commented. 