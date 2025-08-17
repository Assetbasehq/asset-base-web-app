import axios from "axios";

const apiUrl: string = import.meta.env.VITE_API_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: `${apiUrl}/api/v1`,
  withCredentials: true,
});

export default axiosInstance;
