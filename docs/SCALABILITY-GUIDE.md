# 📊 คู่มือการปรับระบบให้รองรับ 20-40 คนพร้อมกัน

## 🎯 สรุปสถานะปัจจุบัน

### ✅ จุดแข็ง (สิ่งที่ดีอยู่แล้ว)
1. **Frontend Architecture แข็งแรง:**
   - Static files → Scale ได้ดีทันที
   - PWA ready → ทำงาน offline ได้
   - LocalStorage → แต่ละ user มี storage แยกกัน
   - No iframe → ไม่มี memory leak
   - Mobile-first design → เหมาะกับ mobile users

2. **Authentication ทำงานได้ดี:**
   - Client-side hashing (SHA-256)
   - Session timeout 1 ชั่วโมง
   - ไม่ต้องพึ่ง server บ่อยๆ

### ⚠️ จุดที่ต้องปรับปรุง

#### 1. Rate Limiting ต่ำเกินไป
**ปัญหา:**
```
Rate limit ปัจจุบัน: 60 requests/minute (global)
40 users × 2-3 requests/minute = 80-120 requests
→ จะโดน block แน่นอน!
```

**วิธีแก้:**
- เพิ่ม global limit เป็น **200 requests/minute**
- เพิ่ม per-IP limit **30 requests/minute** (ป้องกัน abuse)
- Sheets API limit **60 requests/minute** (เพราะมี Google quota)

#### 2. ไม่มี Caching
**ปัญหา:**
- ทุก request ไป Google Sheets ตรงๆ
- ช้า + เปลือง quota
- ไม่จำเป็นต้อง real-time ทุก request

**วิธีแก้:**
- เพิ่ม in-memory cache (node-cache)
- Cache read operations เป็น **30 วินาที**
- Invalidate cache เมื่อมี write
- Request deduplication (หลาย user request ข้อมูลเดียวกัน → query ครั้งเดียว)

#### 3. Single Process Node.js
**ปัญหา:**
- Node.js ทำงานใน single thread
- CPU-bound operations จะ block
- ไม่ใช้ประโยชน์จาก multi-core CPU

**วิธีแก้:**
- เปิดใช้ **Cluster Mode**
- สร้าง worker processes ตามจำนวน CPU cores
- Auto-restart workers เมื่อ crash
- Load balancing อัตโนมัติ

#### 4. Google Sheets API Quota
**ปัญหา:**
- Read/Write: 100 requests per 100 seconds
- 40 users concurrent = อาจเกิน quota

**วิธีแก้:**
- ใช้ cache ลด read operations
- Batch writes เมื่อเป็นไปได้
- Implement retry with exponential backoff

---

## 🚀 การติดตั้งระบบใหม่

### 1. ติดตั้ง Dependencies เพิ่ม

```bash
cd server
npm install node-cache
```

### 2. เปลี่ยนไฟล์ Server

**Option A: แทนที่ไฟล์เดิม (แนะนำ)**
```bash
# Backup ไฟล์เดิมก่อน
cp index.js index.js.backup
cp routes/sheets.js routes/sheets.js.backup

# แทนที่ด้วยไฟล์ใหม่
cp index-enhanced.js index.js
cp routes/sheets-enhanced.js routes/sheets.js
cp package-enhanced.json package.json

# Install dependencies
npm install
```

**Option B: ทดสอบแยก**
```bash
# รันแบบ enhanced
npm install
node index-enhanced.js
```

### 3. ตั้งค่า Environment Variables

แก้ไขไฟล์ `.env`:

```bash
# Server
PORT=8787
NODE_ENV=production

# Clustering (เปิดใช้งาน!)
ENABLE_CLUSTER=true
# NUM_WORKERS=4  # ถ้าไม่ระบุ = ใช้ตามจำนวน CPU cores

# Security (สร้าง token ใหม่)
API_TOKEN=your-secure-random-token-here

# CORS
ALLOW_ORIGINS=http://127.0.0.1:8080,http://localhost:8080,https://zolapolysack.github.io

# Google Sheets
GOOGLE_SERVICE_ACCOUNT_FILE=./google-service-account.json
```

**สร้าง secure API token:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. รันระบบ

**แบบ Cluster (แนะนำสำหรับ production):**
```bash
npm run start:cluster
```

**แบบ Single (สำหรับ development):**
```bash
npm run start:single
```

---

## 🧪 ทดสอบระบบ

### 1. ตั้งค่า Test Script

แก้ไขไฟล์ `scripts/load-test.js`:
```javascript
const API_BASE = 'http://127.0.0.1:8787';
const API_TOKEN = 'your-api-token';
const SPREADSHEET_ID = 'your-test-spreadsheet-id';
const NUM_USERS = 40;  // ทดสอบ 40 users
const REQUESTS_PER_USER = 5;
```

### 2. รัน Load Test

```bash
cd scripts
node load-test.js
```

### 3. วิเคราะห์ผลลัพธ์

Script จะแสดง:
- **Success Rate:** ควรจะ ≥ 95%
- **Latency P90:** ควรจะ < 500ms
- **Throughput:** ควรจะ ≥ 10 req/s
- **Rate Limiting:** ไม่ควรเจอ (ถ้าเจอ = ต้องปรับ config)

**ตัวอย่างผลลัพธ์ที่ดี:**
```
Test Results:
  Concurrent Users:     40
  Total Requests:       200
  Success Rate:         98.5%
  P90 Latency:          342ms
  Throughput:           15.3 req/s

Assessment:
  ✓ Excellent success rate
  ✓ Good latency (P90 < 500ms)
  ✓ Good throughput
  
🎉 System ready for 40 concurrent users!
```

**ตัวอย่างผลลัพธ์ที่มีปัญหา:**
```
Test Results:
  Success Rate:         65%
  P90 Latency:          1250ms
  Rate Limited:         42 requests (21%)

Assessment:
  ✗ Poor success rate - system overloaded
  ✗ High latency (P90 > 1s)
  ✗ Rate limiting detected
  
❌ System NOT ready for production
```

---

## 📈 การ Monitor ระบบ

### 1. Health Check

```bash
curl http://127.0.0.1:8787/api/health
```

ผลลัพธ์:
```json
{
  "ok": true,
  "cluster": {
    "worker": 1,
    "pid": 12345
  },
  "uptime": 3600,
  "memory": {
    "rss": 52428800,
    "heapUsed": 31457280
  }
}
```

### 2. Cache Statistics

```bash
curl http://127.0.0.1:8787/api/sheets/cache/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

ผลลัพธ์:
```json
{
  "ok": true,
  "stats": {
    "keys": 15,
    "hits": 234,
    "misses": 45,
    "hitRate": 83.9
  }
}
```

**การวิเคราะห์:**
- **Hit Rate > 80%** = ดีมาก (cache ช่วยลด load ได้เยอะ)
- **Hit Rate 50-80%** = พอใช้
- **Hit Rate < 50%** = cache ไม่ค่อยได้ผล (อาจต้องเพิ่ม TTL)

### 3. Clear Cache (เมื่อต้องการ)

```bash
# Clear all
curl -X POST http://127.0.0.1:8787/api/sheets/cache/clear \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"

# Clear specific pattern
curl -X POST http://127.0.0.1:8787/api/sheets/cache/clear \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"pattern": "SPREADSHEET_ID"}'
```

---

## 🔧 การปรับแต่งเพิ่มเติม

### 1. เพิ่ม Cache TTL

แก้ไขในไฟล์ `routes/sheets-enhanced.js`:
```javascript
const cache = new NodeCache({ 
  stdTTL: 60,  // เพิ่มเป็น 60 วินาที (จาก 30)
  checkperiod: 120 
});
```

**แนะนำ:**
- Data ที่ไม่ค่อยเปลี่ยน (เช่น master data): **300 วินาที** (5 นาที)
- Data ที่เปลี่ยนบ่อย (เช่น shift logs): **30 วินาที**

### 2. ปรับ Rate Limits

แก้ไขในไฟล์ `index-enhanced.js`:
```javascript
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 300,  // เพิ่มเป็น 300 ถ้ามี users มากกว่า 40
});

const sheetsLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,  // เพิ่มตาม Google quota ที่มี
});
```

### 3. เพิ่ม Worker Processes

แก้ไขใน `.env`:
```bash
NUM_WORKERS=8  # เพิ่มถ้า server มี CPU cores เยอะ
```

---

## 📱 Frontend Optimization

### 1. ลด API Calls

**ปัญหา:** User เปิดหน้า shift form → โหลดข้อมูลทุกครั้ง

**วิธีแก้:**
```javascript
// ใช้ localStorage cache
const CACHE_KEY = 'shift_data_cache';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function loadDataWithCache() {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TTL) {
      console.log('Using cached data');
      return Promise.resolve(data);
    }
  }
  
  // Fetch from API
  return fetch('/api/sheets/read', {...})
    .then(res => res.json())
    .then(data => {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
      return data;
    });
}
```

### 2. Batch Operations

**แทนที่:**
```javascript
// ❌ แย่: บันทึกทีละแถว
for (let row of rows) {
  await saveToSheet(row);  // 10 rows = 10 API calls
}
```

**เป็น:**
```javascript
// ✅ ดี: บันทึกพร้อมกันหมด
await saveToSheet(rows);  // 10 rows = 1 API call
```

### 3. Debounce User Input

```javascript
// ป้องกัน user พิมพ์เร็วๆ แล้วเรียก API ทุกตัวอักษร
let debounceTimer;
function handleSearch(query) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    searchAPI(query);
  }, 500);  // รอ 500ms หลังพิมพ์ครั้งล่าสุด
}
```

---

## 🔒 Security Checklist

- [x] Helmet CSP enabled
- [x] CORS restricted
- [x] Rate limiting per IP
- [x] Bearer token authentication
- [ ] HTTPS enabled (ต้องตั้งค่าเพิ่ม)
- [ ] Input validation ทุก endpoint
- [ ] SQL injection prevention (ถ้าใช้ database)
- [ ] XSS protection (ตรวจสอบ CSP)

---

## 🚨 Troubleshooting

### ปัญหา: Rate Limit ถูกเจอบ่อย

**อาการ:**
```json
{ "ok": false, "error": "Too many requests" }
```

**วิธีแก้:**
1. เพิ่ม rate limit ใน `index-enhanced.js`
2. เพิ่ม cache TTL
3. ลด API calls ในฝั่ง frontend

### ปัญหา: Latency สูง (> 1 วินาที)

**สาเหตุที่เป็นไปได้:**
1. Google Sheets API ช้า → ใช้ cache
2. ไม่ได้เปิด clustering → เปิด `ENABLE_CLUSTER=true`
3. Network ช้า → ใช้ CDN หรือ server ใกล้ user
4. Memory leak → restart workers

**วิธาตรวจสอบ:**
```bash
# ดู memory usage
curl http://127.0.0.1:8787/api/health | jq .memory

# ดู cache hit rate
curl http://127.0.0.1:8787/api/sheets/cache/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### ปัญหา: Worker ตายบ่อย

**ดู logs:**
```bash
tail -f server/logs/combined-*.log
```

**สาเหตุที่เป็นไปได้:**
1. Memory leak → ตรวจสอบ code
2. Uncaught exceptions → เพิ่ม error handling
3. Google API quota exceeded → ใช้ cache มากขึ้น

---

## 📊 Capacity Planning

### ประมาณการสำหรับ 20-40 users:

| Metric | ค่าที่คาดหวัง | สูงสุด |
|--------|--------------|--------|
| **Requests/minute** | 80-120 | 200 |
| **Peak concurrent** | 40 | 60 |
| **API latency (P90)** | 200-400ms | 500ms |
| **Memory/worker** | 50-100MB | 200MB |
| **CPU usage** | 20-40% | 60% |

### เมื่อไหร่ต้อง Scale Up:

**ถ้าเจอสัญญาณเหล่านี้:**
- Success rate < 95%
- P90 latency > 500ms
- CPU usage > 70%
- Memory > 80% ของ RAM
- Rate limiting > 5% ของ requests

**วิธี Scale:**
1. **Vertical (เพิ่มกำลัง server):**
   - เพิ่ม RAM
   - เพิ่ม CPU cores
   - เพิ่ม `NUM_WORKERS`

2. **Horizontal (เพิ่มจำนวน server):**
   - ใช้ Load Balancer (nginx, HAProxy)
   - Deploy หลาย instances
   - ใช้ shared cache (Redis)

---

## ✅ Checklist ก่อน Production

### Backend:
- [ ] เปิด `ENABLE_CLUSTER=true`
- [ ] ตั้ง `API_TOKEN` ที่ปลอดภัย
- [ ] ปรับ `ALLOW_ORIGINS` ให้ตรงกับ domain จริง
- [ ] ทดสอบ load test ผ่าน (success rate ≥ 95%)
- [ ] ตรวจสอบ cache hit rate > 70%
- [ ] ตั้ง logging + monitoring

### Frontend:
- [ ] เพิ่ม localStorage cache
- [ ] ใช้ batch operations
- [ ] เพิ่ม loading indicators
- [ ] Error handling ครบทุก API call
- [ ] ทดสอบบน mobile จริง 5-10 เครื่อง

### Infrastructure:
- [ ] Backup Google Sheets เป็นประจำ
- [ ] ตั้ง alert เมื่อ server down
- [ ] ทดสอบ disaster recovery
- [ ] เตรียม scale-up plan

---

## 🎯 สรุป

### ระบบปัจจุบัน (ก่อนปรับ):
- ⚠️ รองรับ ~10-15 users พร้อมกัน
- ⚠️ อาจเจอ rate limiting
- ⚠️ Latency สูงเมื่อมี concurrent requests เยอะ

### หลังปรับระบบ (ใช้ enhanced version):
- ✅ รองรับ **20-40 users** พร้อมกัน
- ✅ Rate limiting เพียงพอ (200 req/min)
- ✅ Cache ช่วยลด load 70-80%
- ✅ Clustering ใช้ CPU ได้เต็มที่
- ✅ Auto-restart เมื่อ worker crash

### การ Deploy:

**Quick Start (5 นาที):**
```bash
# 1. Backup
cp server/index.js server/index.js.backup

# 2. แทนที่ไฟล์
cp server/index-enhanced.js server/index.js
cp server/routes/sheets-enhanced.js server/routes/sheets.js

# 3. Install
cd server && npm install node-cache

# 4. Config
# แก้ไขไฟล์ .env ให้ ENABLE_CLUSTER=true

# 5. Start
npm run start:cluster

# 6. Test
cd ../scripts && node load-test.js
```

**หากต้องการความช่วยเหลือเพิ่มเติม:**
- ดู logs: `server/logs/`
- Health check: `http://127.0.0.1:8787/api/health`
- Cache stats: `GET /api/sheets/cache/stats`

---

**อัพเดทล่าสุด:** 2024
**เวอร์ชัน:** 2.0 (Enhanced for 20-40 concurrent users)
