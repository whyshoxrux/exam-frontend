import { API_BASE_URL } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Product"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/users/me",
      providesTags: ["User"],
    }),

    getProducts: builder.query({
      query: () => "/products",
      providesTags: ["Product"],
    }),

    getOneProduct: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"],
    }),

    // Updated to match your backend's PUT /users/:id endpoint
    updateUser: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: formData, // Sending FormData with the profile picture
      }),
      invalidatesTags: ["User"], // Refetch user data after update
    }),

    // Optional: Keep this if you need a separate endpoint for other updates
    updateUserDetails: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetOneProductQuery,
  useUpdateUserMutation,
  useUpdateUserDetailsMutation,
} = userApi;