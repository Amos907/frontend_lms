import { createSlice } from "@reduxjs/toolkit";

const initialState = { access: null, refresh: null, user: null };
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setAuthTokens: function (state, action) {
      state.refresh = action.payload.refreshToken;
      state.access = action.payload.token;
    },
    setUser: function (state, action) {
      state.user = action.payload.user;
    },
    setLogout: function (state) {
      state.user = null;
      state.refresh = null;
      state.access = null;
    },
  },
});

export default loginSlice;
