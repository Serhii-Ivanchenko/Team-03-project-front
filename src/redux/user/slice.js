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
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const handlePendingIsLoggedIn = (state) => {
  state.isLoggedIn = false;
  state.isLoading = true;
  state.error = null;
};

const handleRejectedIsLoggedIn = (state, action) => {
  state.token = null;
  state.isLoggedIn = false;
  state.isLoading = false;
  state.error = action.payload;
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState.user,
  reducers: {
    resetToken: (state, action) => {
      state.token = action.payload;
    },
    logoutAction: (state) => {
      state.user = initialState.user;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(register.pending, handlePendingIsLoggedIn)
      .addCase(register.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload.data.user };
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(register.rejected, handleRejectedIsLoggedIn)
      .addCase(logIn.pending, handlePendingIsLoggedIn)
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload.data.user };
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logIn.rejected, handleRejectedIsLoggedIn)
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, (state) => {
        state.user = initialState.user;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logOut.rejected, handleRejected)
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload.data };
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.token = null;
        state.isRefreshing = false;
        state.error = action.payload;
      })
      .addCase(getUserData.pending, handlePending)
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getUserData.rejected, handleRejected)
      .addCase(updateUserAvatar.pending, handlePending)
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.user.photo = action.payload.data.photo;
        state.isLoading = false;
      })
      .addCase(updateUserAvatar.rejected, handleRejected)
      .addCase(updateUserData.pending, handlePending)
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.user = {
          ...state.user,
          ...action.payload.data,
        };
        state.isLoading = false;
      })
      .addCase(updateUserData.rejected, handleRejected)
      .addCase(logInWithGoogle.pending, (state) => {
        state.isLoggedIn = false;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logInWithGoogle.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;

        state.user = { ...state.user, ...user };
        state.token = accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logInWithGoogle.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const { resetToken, logoutAction } = userSlice.actions;
export default userSlice.reducer;
