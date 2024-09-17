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

const userSlice = createSlice({
  name: "user",
  initialState: initialState.user,
  extraReducers: (builder) =>
    builder
      .addCase(register.pending, (state, action) => {
        state.isLoggedIn = false;
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log("Received payload:", action.payload.data); 

        state.user = { ...state.user, ...action.payload.data.user };
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;

        console.log("Saved token:", state.token);
        console.log("Updated state:", state.user, state.token);
      })
      .addCase(register.rejected, (state,action) => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = initialState.user;
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
