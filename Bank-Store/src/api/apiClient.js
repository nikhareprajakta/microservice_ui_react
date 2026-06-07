import axios from "axios";


const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json", // ✅ Add this line
  },
  timeout: 10000,
   withCredentials: true, // 🔥 REQUIRED for session auth withCredentials: true, // 🔥 REQUIRED for session auth
});

export default apiClient;
