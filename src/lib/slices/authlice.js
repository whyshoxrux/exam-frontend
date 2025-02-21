import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Foydalanuvchi ma'lumoti
  token: null, // Auth token
  isAuthenticated: false, // Login holati
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem("accessToken", action.payload.token);

      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    initializeAuth: (state) => {
      if (typeof window !== "undefined") {
        state.isAuthenticated = !!localStorage.getItem("accessToken");
      }
    },
  },
});

export const { setUser, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
