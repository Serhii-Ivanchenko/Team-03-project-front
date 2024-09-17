import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://watertracker-app-spy2.onrender.com";

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
      const response = await axios.post("/auth/login", userData);
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
      const savedToken = reduxState.auth.token;
      setAuthHeader(savedToken);
      const response = await axios.post("/auth/refresh");
      return response.data;
    } catch (error) {
      clearAuthHeader();
      return thunkAPI.rejectWithValue(error.response.status);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.token;
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
      // Запит на підтвердження Google логіну
      const response = await axios.post("/auth/google/confirm-google-auth", {
        code, // Передаємо код для авторизації
      });

      const { accessToken, user } = response.data.data;

      // Встановлюємо заголовок з токеном для подальших запитів
      setAuthHeader(accessToken);

      // Зберігаємо токен у локальне сховище для відновлення сесії
      localStorage.setItem("accessToken", accessToken);

      // Повертаємо необхідні дані для оновлення стану
      return { accessToken, user };
    } catch (error) {
      // Якщо виникає помилка, відправляємо її у `rejected` стан
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
