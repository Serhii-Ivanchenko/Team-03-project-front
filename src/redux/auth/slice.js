import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  activateUser,
  login,
  logOut,
  refreshUser,
  register,
  requestActivationEmail,
} from "./operations";
import persistReducer from "redux-persist/es/persistReducer";
import { INITIAL_STATE } from "../constants";
import storage from "redux-persist/lib/storage";

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE.auth,
  reducers: {
    showOnboarding: (state, action) => {
      state.showOnboardingTour = action.payload;
    },
    setTokenRegister: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isError = false;
      })
      .addCase(activateUser.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.showOnboardingTour = true;
        state.isLoading = false;
      })
      .addCase(requestActivationEmail.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
      })
      .addCase(activateUser.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(activateUser.rejected, (state, action) => {
        state.isError = action.payload.data;
        state.isLoading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.token = null;
        state.isLoading = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
      })
      .addMatcher(isAnyOf(register.pending, login.pending), (state) => {
        state.isLoading = true;
        state.isError = false;
      })

      .addMatcher(isAnyOf(register.rejected, login.rejected), (state) => {
        state.isLoading = false;
      }),
});

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "showOnboardingTour"],
};

const authReducer = authSlice.reducer;
export const { showOnboarding, setTokenRegister } = authSlice.actions;
export const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authReducer
);
