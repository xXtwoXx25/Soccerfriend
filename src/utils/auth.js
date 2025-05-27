// src/utils/auth.js

/**
 * ตรวจสอบว่าผู้ใช้เข้าสู่ระบบแล้วหรือไม่
 * @returns {boolean} สถานะการเข้าสู่ระบบ
 */
export const isLoggedIn = () => {
   return !!localStorage.getItem("token");
 };
 
 /**
  * บันทึกข้อมูลการเข้าสู่ระบบ
  * @param {string} token โทเค็นสำหรับการยืนยันตัวตน
  * @param {object} userData ข้อมูลผู้ใช้
  */
 export const login = (token, userData) => {
   localStorage.setItem("token", token);
   localStorage.setItem("user", JSON.stringify(userData));
 };
 
 /**
  * ลบข้อมูลการเข้าสู่ระบบและออกจากระบบ
  */
 export const logout = () => {
   localStorage.removeItem("token");
   localStorage.removeItem("user");
 };
 
 /**
  * ดึงข้อมูลผู้ใช้ที่เข้าสู่ระบบ
  * @returns {object|null} ข้อมูลผู้ใช้ หรือ null ถ้าไม่ได้เข้าสู่ระบบ
  */
 export const getUser = () => {
   const user = localStorage.getItem("user");
   return user ? JSON.parse(user) : null;
 };
 
 /**
  * ดึงโทเค็นการยืนยันตัวตน
  * @returns {string|null} โทเค็น หรือ null ถ้าไม่ได้เข้าสู่ระบบ
  */
 export const getToken = () => {
   return localStorage.getItem("token");
 };
 
 /**
  * ตรวจสอบว่าโทเค็นหมดอายุหรือไม่
  * @returns {boolean} สถานะการหมดอายุของโทเค็น
  */
 export const isTokenExpired = () => {
   const token = getToken();
   if (!token) return true;
   
   try {
     // สมมติว่าโทเค็นเป็นรูปแบบ JWT
     const payload = JSON.parse(atob(token.split('.')[1]));
     return payload.exp < Date.now() / 1000;
   } catch (error) {
     return true;
   }
 };
 
 /**
  * ตรวจสอบสิทธิ์ผู้ใช้ในการเข้าถึงหน้า
  * @param {string} role บทบาทที่ต้องการตรวจสอบ
  * @returns {boolean} สถานะการมีสิทธิ์
  */
 export const hasRole = (role) => {
   const user = getUser();
   if (!user) return false;
   
   return user.roles && user.roles.includes(role);
 };
 
 /**
  * อัปเดตข้อมูลผู้ใช้
  * @param {object} userData ข้อมูลผู้ใช้ใหม่
  */
 export const updateUserData = (userData) => {
   const currentUser = getUser();
   if (!currentUser) return;
   
   localStorage.setItem("user", JSON.stringify({
     ...currentUser,
     ...userData
   }));
 };
 
 /**
  * ตรวจสอบว่าผู้ใช้มีการตั้งค่าการแจ้งเตือนหรือไม่
  * @returns {boolean} สถานะการตั้งค่าการแจ้งเตือน
  */
 export const hasNotificationSettings = () => {
   const user = getUser();
   return user && user.notificationSettings;
 };