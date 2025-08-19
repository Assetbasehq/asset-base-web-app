import axios from "axios";
import { getDeviceId } from "./utils";

const apiUrl: string = import.meta.env.VITE_API_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: `${apiUrl}`,
  withCredentials: true,
});

// Request interceptor → attach token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["x-device-id"] = getDeviceId();
  return config;
});

// Response interceptor → handle expired token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // if token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await axios.post(`${apiUrl}/refresh`, { refreshToken });

        localStorage.setItem("accessToken", res.data.accessToken);

        // retry original request with new token
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        localStorage.clear(); // force logout
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
