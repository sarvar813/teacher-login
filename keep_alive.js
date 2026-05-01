const https = require('https');

const BACKEND_URL = 'https://teacher-web-beckend.onrender.com/api/v1/attendance/today/';

console.log("Qarab turuvchi skript ishga tushdi. Har 10 daqiqada backendga so'rov yuboriladi...");

// Har 10 daqiqada ping yuborish (Render 15 daqiqada uxlab qolmasligi uchun)
setInterval(() => {
    https.get(BACKEND_URL, (res) => {
        console.log(`[${new Date().toLocaleTimeString()}] Backendga so'rov yuborildi. Status: ${res.statusCode}`);
    }).on('error', (err) => {
        console.error(`[${new Date().toLocaleTimeString()}] Xatolik:`, err.message);
    });
}, 10 * 60 * 1000); // 10 daqiqa = 600,000 millisekund

// Dastlabki marta bir marta yuborib qo'yish
https.get(BACKEND_URL, (res) => {
    console.log(`[${new Date().toLocaleTimeString()}] Dastlabki so'rov yuborildi. Status: ${res.statusCode}`);
});
