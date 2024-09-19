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

const handlePendingAuth = (state) => {
  state.loadingAuth = true;
  state.error = null;
};

const handleRejectedAuth = (state, action) => {
  state.loadingAuth = false;
  state.error = action.payload;
};

const handlePendingUser = (state) => {
  state.loadingUser = true;
  state.error = null;
};

const handleRejectedUser = (state, action) => {
  state.loadingUser = false;
  state.error = action.payload;
};

const handlePendingIsLoggedIn = (state) => {
  state.isLoggedIn = false;
  state.loadingAuth = true;
  state.error = null;
};

const handleRejectedIsLoggedIn = (state, action) => {
  state.token = null;
  state.isLoggedIn = false;
  state.loadingAuth = false;
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
      state.userData = initialState.user.userData;
      state.token = null;
      state.isLoggedIn = false;
      state.loadingAuth = false;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(register.pending, handlePendingIsLoggedIn)
      .addCase(register.fulfilled, (state, action) => {
        state.userData = { ...state.userData, ...action.payload.data.user };
        // state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.loadingAuth = false;
      })
      .addCase(register.rejected, handleRejectedIsLoggedIn)
      .addCase(logIn.pending, handlePendingIsLoggedIn)
      .addCase(logIn.fulfilled, (state, action) => {
        // state.userData = { ...state.userData, ...action.payload.data.user };
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.loadingAuth = false;
      })
      .addCase(logIn.rejected, handleRejectedIsLoggedIn)
      .addCase(logOut.pending, handlePendingAuth)
      .addCase(logOut.fulfilled, (state) => {
        state.userData = initialState.user;
        state.token = null;
        state.isLoggedIn = false;
        state.loadingAuth = false;
      })
      .addCase(logOut.rejected, handleRejectedAuth)
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.userData = { ...state.userData, ...action.payload.data };
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.token = null;
        state.isRefreshing = false;
        state.error = action.payload;
      })
      .addCase(getUserData.pending, handlePendingUser)
      .addCase(getUserData.fulfilled, (state, action) => {
        state.userData = action.payload.data;
        state.loadingUser = false;
      })
      .addCase(getUserData.rejected, handleRejectedUser)
      .addCase(updateUserAvatar.pending, handlePendingUser)
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.userData.photo = action.payload.data.photo;
        state.loadingUser = false;
      })
      .addCase(updateUserAvatar.rejected, handleRejectedUser)
      .addCase(updateUserData.pending, handlePendingUser)
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.userData = {
          ...state.userData,
          ...action.payload.data,
        };
        state.loadingUser = false;
      })
      .addCase(updateUserData.rejected, handleRejectedUser)
      .addCase(logInWithGoogle.pending, handlePendingIsLoggedIn)
      .addCase(logInWithGoogle.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;

        state.userData = { ...state.userData, ...user };
        state.token = accessToken;
        state.isLoggedIn = true;
        state.loadingAuth = false;
      })
      .addCase(logInWithGoogle.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.loadingAuth = false;
        state.error = action.payload;
      }),
});

export const { resetToken, logoutAction } = userSlice.actions;
export default userSlice.reducer;
