import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:4000",
  withCredentials: true,
});

export default axiosInstance;
