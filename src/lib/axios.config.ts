import env from "@/config";
import axios from "axios";

const apiUrl: string = import.meta.env.VITE_API_URL || "http://localhost:5000";
const web3ApiUrl: string = env.WEB3_SERVICE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: `${apiUrl}`,
});

// Request interceptor → attach accessToken
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const web3axiosInstance = axios.create({
  baseURL: `${web3ApiUrl}`,
});

// Request interceptor → attach accessToken
web3axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { web3axiosInstance };

// Response interceptor → handle expired token
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // if token expired
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = localStorage.getItem("refreshToken");
//         const res = await axios.post(`${apiUrl}/refresh`, { refreshToken });

//         localStorage.setItem("accessToken", res.data.accessToken);

//         // retry original request with new token
//         axiosInstance.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${res.data.accessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (err) {
//         localStorage.clear(); // force logout
//         window.location.href = "/";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
