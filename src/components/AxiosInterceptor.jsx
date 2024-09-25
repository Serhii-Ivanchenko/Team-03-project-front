import { useDispatch } from "react-redux";
import { axiosInstance, setAuthHeader } from "../services/api.js";
import { logoutAction, resetToken } from "../redux/user/slice.js";
import { useEffect } from "react";
import { refreshToken } from "../redux/user/operations.js";
import toast from "react-hot-toast";

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
            const accessToken = await dispatch(refreshToken()).unwrap();

            setAuthHeader(accessToken);

            dispatch(resetToken(accessToken))
              .unwrap()
              .then(() => {
              })
              .catch(() => {
                toast.error("Something went wrong. Please, refresh the page");
              });

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
