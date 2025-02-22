import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authlice";
import api from "./service/api";
import { userApi } from "./service/userApi";
import { cartApi } from "./service/cart-itemApi";
import { categoryApi } from "./service/category.api";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [api.reducerPath]: api.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware,
      userApi.middleware,
      cartApi.middleware,
      categoryApi.middleware
    ),
});

export default store;
