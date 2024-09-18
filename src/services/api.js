import axios from "axios";
// import { store } from "../redux/store";
import { resetToken } from "../redux/user/slice.js";

export const axiosInstance = axios.create({
  baseURL: "https://watertracker-app-spy2.onrender.com",
  withCredentials: true,
});

export const setAuthHeader = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const response = await axios.post("/auth/refresh");

//         const { accessToken } = response.data.data;

//         setAuthHeader(accessToken);

//         store.dispatch(resetToken(accessToken));

//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );
