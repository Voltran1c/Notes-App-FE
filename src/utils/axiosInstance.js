import axios from "axios";
import { BASE_URL } from "./constants";

const axiosInstance = axios.create({
  // instance ของ Axios ที่ถูกสร้างขึ้นมาด้วย axios.create()
  baseURL: BASE_URL, // URL หลักของ API ที่ต้องการเรียกใช้
  timeout: 10000, // ระยะเวลาสูงสุดที่ Axios จะรอให้รับข้อมูลกลับ
  headers: {
    // headers ที่จะถูกส่งไปในทุก request โดยค่า Content-Type
    "Content-Type": "application/json",
  },
});

// ใช้สำหรับตรวจจับ request ก่อนที่จะถูกส่งไปยัง server
axiosInstance.interceptors.request.use(
  (config) => {
    // object ที่มีข้อมูลของ request ทั้งหมด เช่น URL, headers, method, ฯลฯ
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
