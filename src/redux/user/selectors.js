export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

export const selectUser = (state) => state.user.userData;

export const selectAuth = (state) => state.user;

export const selectIsRefreshing = (state) => state.user.isRefreshing;

export const selectLoadingUser = (state) => state.user.loadingUser;

export const selectLoadingAuth = (state) => state.user.loadingAuth;

export const selectLoadingTracker = (state) => state.user.loadingTracker;

export const selectError = (state) => state.user.error;

export const selectName = (state) => state.user.userData.name;
export const selectEmail = (state) => state.user.userData.email;
export const selectGender = (state) => state.user.userData.gender;
export const selectPhoto = (state) => state.user.userData.photo;
export const selectWeight = (state) => state.user.userData.weight;
export const selectActiveTime = (state) => state.user.userData.activeTime;
export const selectDailyNorm = (state) => state.user.userData.dailyNorm;
