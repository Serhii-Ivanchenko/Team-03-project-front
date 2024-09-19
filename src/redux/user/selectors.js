export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

export const selectUser = (state) => state.user.userData;

export const selectAuth = (state) => state.user;

export const selectIsRefreshing = (state) => state.user.isRefreshing;

export const selectIsLoading = (state) => state.user.isLoading;

export const selectError = (state) => state.user.error;
