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
  tagTypes: ["User", "Product", "Reviews"],
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

    deleteOneProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/products/${id}`,
        method: "DELETE",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    updateUser: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),

    updateUserDetails: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["User"],
    }),

    addReview: builder.mutation({
      query: ({ product_id, rating, comment }) => ({
        url: `/reviews`,
        method: "POST",
        body: { product_id, rating, comment },
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetOneProductQuery,
  useUpdateUserMutation,
  useUpdateUserDetailsMutation,
  useDeleteOneProductMutation,
  useAddReviewMutation,
} = userApi;
