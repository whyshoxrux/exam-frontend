import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authlice";
import api from "./service/api";
import { userApi } from "./slices/userApi";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [api.reducerPath]: api.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, userApi.middleware),
});

export default store;
