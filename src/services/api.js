import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://watertracker-app-spy2.onrender.com",
  withCredentials: true,
});

export const setAuthHeader = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axiosInstance.defaults.headers.common["Authorization"] = "";
};