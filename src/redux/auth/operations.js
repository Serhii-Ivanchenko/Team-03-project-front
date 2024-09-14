import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { requestSignIn, requestSignUp } from "../../services/api";
import { AXIOS_INSTANCE } from "../constants";

export const register = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      const { data } = await requestSignUp(formData);
      return data;
    } catch (err) {
      toast.error("This email is already in use. Please log in.");
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const activateUser = createAsyncThunk(
  "auth/activateUser",
  async (activationToken, thunkAPI) => {
    try {
      const { data } = await AXIOS_INSTANCE.post("/users/activate", {
        activationToken,
      });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const requestActivationEmail = createAsyncThunk(
  "auth/requestActivationEmail",
  async (activationToken, thunkAPI) => {
    try {
      const { data } = await AXIOS_INSTANCE.post("/users/request-activation", {
        activationToken,
      });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const data = await requestSignIn(formData);
      return data;
    } catch (err) {
      toast.error("Please sign up");
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await AXIOS_INSTANCE.post("/users/logout");
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState();
    if (!token) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      const response = await AXIOS_INSTANCE.post("/users/refresh");
      return response.data.data;
    } catch (error) {
      thunkAPI.dispatch(logOut());
      return thunkAPI.rejectWithValue(error);
    }
  }
);
