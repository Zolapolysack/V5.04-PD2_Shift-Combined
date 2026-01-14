# V5.04-PD2_Shift-Combined

## 🚀 ระบบบันทึกข้อมูลกะ A & B และรายงาน PD2

ระบบบันทึกข้อมูลการผลิตแบบครบวงจร รองรับการทำงาน 2 กะ (กะ A และกะ B) พร้อมระบบรายงานแบบ Real-time

### ✨ Features

- 📱 **Mobile-First Design** - ออกแบบสำหรับมือถือเป็นหลัก ใช้งานได้ทุกอุปกรณ์
- 💾 **Auto-Save** - บันทึกข้อมูลอัตโนมัติระหว่างพิมพ์
- 🔒 **Authentication** - ระบบ login ที่ปลอดภัย
- 📊 **Google Sheets Integration** - เชื่อมต่อกับ Google Sheets ผ่าน API
- 🌐 **Offline Support** - ใช้งานได้แม้ไม่มีอินเทอร์เน็ต
- 🔄 **PWA Ready** - สามารถติดตั้งเป็น App บนมือถือได้

### 🎯 Version 5.04 Highlights

- ✅ ลบ iframe navigation (แก้ปัญหา double scroll บน mobile)
- ✅ Direct link navigation สำหรับ UX ที่ดีขึ้น
- ✅ Enhanced UI/UX สำหรับมือถือ
- ✅ Responsive design ที่สมดุลทุกหน้าจอ
- ✅ Professional gradient design
- ✅ Improved authentication flow

### 📦 Structure

```
V5.04 PD2_Shift-Combined/
├── index.html                          # หน้าแรก/Dashboard
├── assets/
│   ├── css/                           # Stylesheets
│   ├── js/
│   │   ├── pd2-auth-bridge.js        # Authentication system
│   │   └── config.js                  # Configuration
│   └── images/                        # Images & icons
├── login V2.0/
│   └── forms/neumorphism/            # Login page
├── ปรับ script PD2_Shift-A_V4.0/     # Shift A module
├── ปรับ script PD2_Shift-B_V4.0/     # Shift B module
├── link google sheet/                 # Reports module
├── server/                            # Backend API (Node.js)
└── scripts/                           # Utilities & tools
```

### 🔐 Login Credentials

**Account 1:**
- Username: `Zolapolysack_PD2`
- Password: `ZP9965`

**Account 2:**
- Username: `Zolapolysack_PD`
- Password: `ZP1033`, `ZP1045`, or `ZP1048`

### 🚀 Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/Zolapolysack/V5.04-PD2_Shift-Combined.git
cd V5.04-PD2_Shift-Combined
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```

4. **Open in browser**
```
http://localhost:8080
```

### 📱 Mobile Access

Access via WiFi:
```
http://192.168.2.65:8080
```

### 🛠️ Technologies

- **Frontend:** HTML5, CSS3 (Tailwind), Vanilla JavaScript
- **Backend:** Node.js, Express
- **Storage:** Google Sheets API, IndexedDB (offline)
- **Authentication:** Client-side SHA-256 hashing
- **PWA:** Service Worker, Web Manifest

### 📝 Available Scripts

- `npm start` - Start web server (http-server)
- `npm run watch-reload` - Start dev watcher with auto-reload
- `npm run smoke` - Run smoke tests
- `npm run start-api` - Start backend API server

### 🌐 GitHub Pages Deployment

This project is deployed at: https://zolapolysack.github.io/V5.04-PD2_Shift-Combined/

### 👨‍💻 Developer

- **Developed by:** ZP1048
- **Version:** 5.04 Mobile-First Edition
- **Year:** 2026

### 📄 License

Private - Production Unit 2

---

**Note:** This is a production system. Handle with care and follow security best practices.
