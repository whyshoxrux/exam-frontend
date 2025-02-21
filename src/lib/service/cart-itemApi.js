import { API_BASE_URL } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["CartItems"],
  endpoints: (builder) => ({
    addCartItems: builder.mutation({
      query: (data) => ({
        url: "/cart-item",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CartItems"],
    }),

    getCartItems: builder.query({
      query: () => "/cart-item",
      providesTags: ["CartItems"],
    }),
    updateCartItem: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `/cart-item/${id}`,
        method: "PUT",
        body: { quantity },
      }),
      invalidatesTags: ["CartItems"],
    }),
    removeCartItem: builder.mutation({
      query: (id) => ({
        url: `/cart-item/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CartItems"],
    }),
  }),
});

export const {
  useGetCartItemsQuery,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useAddCartItemsMutation,
} = cartApi;
