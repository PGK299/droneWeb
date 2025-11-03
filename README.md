# Drone-Website
เว็บไซต์นี้เป็นเว็บไซต์สำหรับแสดงข้อมูลที่ได้จากโดรน โดยอยู่ในรูปของอุณหภูมิ (°C) 
# ภาพรวม
- ใช้ `React.js` เป็นหลักในการสร้าง และมี `CSS` สำหรับการตกแต่งเพิ่มเติม
- มีหน้าต่างแสดง
- `View Configs` - ดูชื่อและรหัสของโดรน
- `Log Temperature` - บันทึกค่าอุณหภูมิ
- `View Logs` - ดูรายการที่บันทึกย้อนหลัง 12 รายการล่าสุด
# การติดตั้ง
ใช้คำสั่ง สำหรับติดตั้ง
```bash
npm install
```
ใช้คำสั่ง สำหรับการพัฒนา
```bash
npm run dev
```
# การตั้งค่า .env
สร้างไฟล์ .env ไว้ที่โฟลเดอร์หลักของ Project โดยไฟล์นี้จะเก็บข้อมูล API ที่ใช้กับ DRONE_ID
```bash
# Example
VITE_API_BASE_URL={your_URL}
VITE_DRONE_ID={your_ID}
```
# การแสดงผล
- `App.jsx` - เรียกหน้าต่าง ๆ มาแสดงผล
- `Home.jsx` - หน้าแรก
- `TempForm.jsx` - หน้าบันทึกข้อมูลอุณหภูมิ
- `ViewConfigs.jsx` - หน้าดูชื่อและ ID ของโดรน
- `ViewLog.jsx` - หน้าดูประวัติการบันทึก
# Hosting
ใช้ `vercel` สำหรับ Host เว็บไซต์
- https://drone-web-xi.vercel.app/
