export const initialState = {
  water: {
    items: {
      totalValue: null,
      day: [],
      month: [],
    },

    loading: false,
    error: null,
  },

  user: {
    user: {
      name: null,
      email: null,
      gender: null,
      photo: null,
      weight: null,
      activeTime: null,
      dailyNorm: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    isLoading: false,
    error: null,
  },
};
