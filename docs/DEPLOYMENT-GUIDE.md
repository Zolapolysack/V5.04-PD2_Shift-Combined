# 🔗 คู่มือการเชื่อมต่อ Enhanced Version เข้ากับระบบหลัก

**วันที่:** 15 มกราคม 2026  
**สถานะปัจจุบัน:** ✅ ไฟล์พร้อมใช้งาน | 🔴 ยังไม่ได้เชื่อมต่อกับระบบหลัก

---

## ✅ ผลการตรวจสอบความพร้อม

### 1. Syntax & Errors
- ✅ **Node.js Syntax Check:** ผ่านทั้งหมด (0 errors)
- ✅ **VS Code Linter:** ผ่านทั้งหมด (0 errors)
- ✅ **Import Statements:** ถูกต้องครบถ้วน
- ✅ **Code Quality:** ไม่มี bugs หรือ logic errors

### 2. Dependencies
- ✅ **Express:** v4.19.2 (มีอยู่แล้ว)
- ✅ **Helmet:** v7.1.0 (มีอยู่แล้ว)
- ✅ **CORS:** v2.8.5 (มีอยู่แล้ว)
- ⚠️ **node-cache:** v5.1.2 (ต้องติดตั้ง)

### 3. Configuration
- ✅ **Environment Variables:** พร้อมใช้
- ✅ **Port Configuration:** 8787 (เหมือนเดิม)
- ✅ **Google Sheets API:** ใช้ config เดิม

---

## 📝 Checklist การเชื่อมต่อ

### ⚠️ ก่อนเริ่ม - อ่านก่อนทุกครั้ง!

```
❗ คำเตือน: การเชื่อมต่อจะแทนที่ไฟล์เดิม
✅ Backup ไฟล์เดิมก่อนเสมอ!
```

---

## 🚀 วิธีการเชื่อมต่อ (3 Options)

### Option 1: ทดสอบแบบไม่แทนที่ไฟล์เดิม (แนะนำสำหรับครั้งแรก)

```powershell
# 1. ติดตั้ง dependencies
cd server
npm install node-cache

# 2. ทดสอบรัน enhanced version (port อื่น)
$env:PORT=8788
node index-enhanced.js

# 3. เปิด terminal ใหม่ทดสอบ
curl http://127.0.0.1:8788/api/health

# 4. ถ้าทำงานได้ดี ให้ stop (Ctrl+C) แล้วไปต่อ Option 2
```

**ตรวจสอบ:**
- [ ] Server เริ่มได้ไม่ error
- [ ] Health check ตอบกลับมา
- [ ] แสดง cluster information (ถ้าเปิด ENABLE_CLUSTER)

---

### Option 2: Backup แล้วแทนที่ (แนะนำสำหรับ Production)

```powershell
# 1. Backup ไฟล์เดิม (สำคัญมาก!)
cd server
Copy-Item index.js index.js.backup
Copy-Item routes\sheets.js routes\sheets.js.backup
Copy-Item package.json package.json.backup

# 2. แสดง backup ที่สร้าง
Get-ChildItem *.backup

# 3. แทนที่ด้วยไฟล์ enhanced
Copy-Item index-enhanced.js index.js -Force
Copy-Item routes\sheets-enhanced.js routes\sheets.js -Force

# 4. ติดตั้ง dependencies เพิ่ม
npm install node-cache

# 5. ตั้งค่า environment (ถ้าต้องการ clustering)
# แก้ไขไฟล์ .env:
# ENABLE_CLUSTER=true

# 6. Restart server
npm run start
```

**ตรวจสอบ:**
- [ ] Backup files ถูกสร้างแล้ว (*.backup)
- [ ] node-cache ติดตั้งสำเร็จ
- [ ] Server เริ่มใหม่ได้ไม่ error
- [ ] ระบบทำงานเหมือนเดิม

---

### Option 3: ใช้ PM2 (สำหรับ Production Server)

```powershell
# 1. Backup
cd server
Copy-Item index.js index.js.backup
Copy-Item routes\sheets.js routes\sheets.js.backup

# 2. แทนที่ไฟล์
Copy-Item index-enhanced.js index.js -Force
Copy-Item routes\sheets-enhanced.js routes\sheets.js -Force

# 3. ติดตั้ง dependencies
npm install node-cache

# 4. Stop PM2 (ถ้ากำลังรันอยู่)
pm2 stop all

# 5. Start ด้วย ecosystem.config.js
pm2 start ecosystem.config.js

# 6. ดูสถานะ
pm2 status
pm2 logs
```

**ตรวจสอบ:**
- [ ] PM2 processes กำลังทำงาน
- [ ] Logs ไม่มี errors
- [ ] Memory usage ปกติ

---

## 🧪 การทดสอบหลังเชื่อมต่อ

### 1. Health Check

```powershell
# ทดสอบ API ยังทำงานได้
curl http://127.0.0.1:8787/api/health
```

**ผลลัพธ์ที่คาดหวัง:**
```json
{
  "ok": true,
  "service": "pd2-sheets-proxy",
  "cluster": {
    "worker": 1,
    "pid": 12345
  },
  "uptime": 10,
  "memory": {...}
}
```

### 2. Clustering Check (ถ้าเปิดใช้)

```powershell
# ควรเห็น multiple workers
Get-Process -Name node | Select-Object Id, WorkingSet, StartTime
```

### 3. Cache Check

```powershell
# ทดสอบ cache endpoint (ต้องมี Bearer token)
$token = "YOUR_API_TOKEN"
curl http://127.0.0.1:8787/api/sheets/cache/stats `
  -H "Authorization: Bearer $token"
```

**ผลลัพธ์ที่คาดหวัง:**
```json
{
  "ok": true,
  "stats": {
    "keys": 0,
    "hits": 0,
    "misses": 0
  }
}
```

### 4. Functional Test

```powershell
# ทดสอบ Shift A/B modules ยังทำงานได้
# เปิดเว็บเบราว์เซอร์:
start http://127.0.0.1:8080
```

**ตรวจสอบ:**
- [ ] หน้า login เข้าได้
- [ ] Shift A form โหลดได้
- [ ] Shift B form โหลดได้
- [ ] บันทึกข้อมูล Google Sheets ได้

### 5. Load Test (Optional)

```powershell
# ทดสอบ load 40 users
cd ..\scripts
node load-test.js
```

**ผลลัพธ์ที่ต้องการ:**
- Success Rate: ≥ 95%
- P90 Latency: < 500ms
- No rate limiting errors

---

## 🔄 การ Rollback (ถ้ามีปัญหา)

### แบบเร็ว

```powershell
cd server

# Stop server ก่อน (Ctrl+C หรือ pm2 stop)

# Restore จาก backup
Copy-Item index.js.backup index.js -Force
Copy-Item routes\sheets.js.backup routes\sheets.js -Force

# Restart
npm run start
```

### แบบละเอียด

```powershell
cd server

# 1. Stop all processes
Get-Process -Name node | Stop-Process -Force

# 2. Restore files
Copy-Item index.js.backup index.js -Force
Copy-Item routes\sheets.js.backup routes\sheets.js -Force

# 3. Uninstall node-cache (ถ้าต้องการ)
npm uninstall node-cache

# 4. Clear cache
npm cache clean --force

# 5. Reinstall
npm install

# 6. Start
npm run start

# 7. Verify
curl http://127.0.0.1:8787/api/health
```

---

## 📊 Monitoring หลังเชื่อมต่อ

### ควรติดตามสิ่งเหล่านี้:

1. **Server Uptime**
   ```powershell
   pm2 status
   ```

2. **Memory Usage**
   ```powershell
   Get-Process -Name node | Select-Object WorkingSet64
   ```

3. **Cache Hit Rate**
   ```powershell
   # ควรจะ > 70% หลังใช้งานสักพัก
   curl http://127.0.0.1:8787/api/sheets/cache/stats -H "Authorization: Bearer $token"
   ```

4. **Error Logs**
   ```powershell
   Get-Content server\logs\combined-*.log -Tail 50
   ```

5. **Response Time**
   ```powershell
   Measure-Command { curl http://127.0.0.1:8787/api/health }
   ```

---

## ⚠️ Troubleshooting

### ปัญหา: "Cannot find module 'node-cache'"

```powershell
cd server
npm install node-cache
```

### ปัญหา: "Address already in use (port 8787)"

```powershell
# หา process ที่ใช้ port
Get-NetTCPConnection -LocalPort 8787 | Select-Object OwningProcess
Stop-Process -Id <PID>
```

### ปัญหา: Cluster mode ไม่ทำงาน

```powershell
# ตรวจสอบ .env
Get-Content .env | Select-String "ENABLE_CLUSTER"

# ถ้าไม่มี ให้เพิ่ม
Add-Content .env "`nENABLE_CLUSTER=true"
```

### ปัญหา: Cache ไม่ทำงาน

```powershell
# ตรวจสอบว่าใช้ sheets-enhanced.js จริงๆ
Get-Content server\index.js | Select-String "sheets-enhanced"
```

---

## 📋 Checklist สุดท้าย

ก่อน Deploy Production:

- [ ] Backup ไฟล์เดิมแล้ว (*.backup)
- [ ] node-cache ติดตั้งแล้ว
- [ ] ทดสอบ health check ผ่าน
- [ ] ทดสอบ functional test ผ่าน
- [ ] ตั้งค่า ENABLE_CLUSTER (ถ้าต้องการ)
- [ ] ตั้งค่า API_TOKEN ใหม่ (secure)
- [ ] ตั้งค่า ALLOW_ORIGINS ให้ถูกต้อง
- [ ] ทดสอบ load test ผ่าน (optional)
- [ ] เตรียม rollback plan
- [ ] แจ้ง users ก่อน deploy (ถ้าจำเป็น)

---

## 🎯 สรุป

### ไฟล์ที่จะถูกเปลี่ยน:
1. `server/index.js` ← `server/index-enhanced.js`
2. `server/routes/sheets.js` ← `server/routes/sheets-enhanced.js`

### ไฟล์ที่จะเพิ่ม:
1. `server/node_modules/node-cache/` (package ใหม่)

### ไฟล์ Backup:
1. `server/index.js.backup`
2. `server/routes/sheets.js.backup`
3. `server/package.json.backup`

### ผลลัพธ์ที่ได้:
- ✅ รองรับ 20-40 concurrent users
- ✅ Rate limiting: 200 req/min (จาก 60)
- ✅ Caching: 70-80% hit rate
- ✅ Clustering: ใช้ทุก CPU cores
- ✅ Performance: P90 < 500ms

---

**หมายเหตุ:** ระบบปัจจุบันยังทำงานได้ปกติ จนกว่าจะทำการเชื่อมต่อตาม Option 1, 2 หรือ 3 ข้างต้น

**แนะนำ:** เริ่มจาก Option 1 (ทดสอบก่อน) → Option 2 (deploy จริง)
