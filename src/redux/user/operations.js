import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
// "https://watertracker-app-spy2.onrender.com";

export const setAuthHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common["Authorization"] = "";
};

// Операція для реєстрації користувача
export const register = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/auth/register", userData);
      setAuthHeader(response.data.data.accessToken);
      console.log("Full backend response:", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.status);
    }
  }
);

// Операція для логіну користувача
export const logIn = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/auth/login", userData, {
        withCredentials: true,
      });
      setAuthHeader(response.data.data.accessToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.status);
    }
  }
);

// Операція для логауту користувача
export const logOut = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    const response = await axios.post("/auth/logout");
    clearAuthHeader();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.status);
  }
});

// Операція для оновлення доступу користувача
export const refreshUser = createAsyncThunk(
  "user/refresh",
  async (_, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const token = reduxState.user.token;
      console.log("token from state", token);

      setAuthHeader(token);

      const response = await axios.post(
        "/auth/refresh",
        {},
        {
          withCredentials: true,
        }
      );
      console.log("response data on front end", response.data);

      setAuthHeader(response.data.data.accessToken);
      return response.data;
    } catch (error) {
      clearAuthHeader();
      console.error("Error refreshing user:", error);
      return thunkAPI.rejectWithValue(error.response.status);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.user.token;
      return savedToken !== null;
    },
  }
);

// Операція для отримання інформації про поточного користувача
export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/users/data");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Операція для зміни інформації про користувача
export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async (userDataToUpdate, thunkAPI) => {
    try {
      const response = await axios.patch(`/users/update`, userDataToUpdate);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Операція для зміни аватару користувача
export const updateUserAvatar = createAsyncThunk(
  "user/updateAvatar",
  async (newAvatar, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("photo", newAvatar);

      const response = await axios.patch("/users/photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logInWithGoogle = createAsyncThunk(
  "user/logInWithGoogle",
  async (code, thunkAPI) => {
    try {
      const response = await axios.post("/auth/google/confirm-google-auth", {
        code,
      });
      const { accessToken, user } = response.data.data;
      setAuthHeader(accessToken);
      localStorage.setItem("accessToken", accessToken);
      return { accessToken, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// для зміни паролю користувача
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/reset-password", { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
