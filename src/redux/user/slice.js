import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState.js";
import {
  getUserData,
  logIn,
  logInWithGoogle,
  logOut,
  refreshUser,
  register,
  updateUserAvatar,
  updateUserData,
} from "./operations.js";

const handlePending = (state) => {
  state.isLoggedIn = false;
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.token = null;
  state.isLoggedIn = false;
  state.isLoading = false;
  state.error = action.payload;
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState.user,
  extraReducers: (builder) =>
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload.data.user };
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(register.rejected, handleRejected)
      .addCase(logIn.pending, handlePending)
      .addCase(logIn.fulfilled, (state, action) => {
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logIn.rejected, handleRejected)
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, (state) => {
        state.user = initialState.user;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.user = initialState.user;
        handleRejected(state, action);
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.token = null;
      })
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserAvatar.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.photo = action.payload;
      })
      .addCase(updateUserAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserData.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          ...state.user,
          ...action.payload,
        };
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logInWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logInWithGoogle.rejected, (state) => {
        state.isLoggedIn = false;
      }),
});

export default userSlice.reducer;
