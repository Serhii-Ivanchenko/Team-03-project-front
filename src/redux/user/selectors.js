export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

export const selectUser = (state) => state.user.user;

export const selectAuth = (state) => state.user;

export const selectIsRefreshing = (state) => state.user.isRefreshing;
