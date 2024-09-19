import { useDispatch } from "react-redux";
import { axiosInstance, setAuthHeader } from "../services/api.js";
import { logoutAction, resetToken } from "../redux/user/slice.js";
import { useEffect } from "react";

export function AxiosInterceptor() {
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const response = await axiosInstance.post("/auth/refresh");

            const { accessToken } = response.data.data;
            console.log(accessToken);

            setAuthHeader(accessToken);

            dispatch(resetToken(accessToken));
            console.log("return", originalRequest);
            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            return await axiosInstance(originalRequest);
          } catch (refreshError) {
            dispatch(logoutAction());
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }, [dispatch]);

  return null;
}
