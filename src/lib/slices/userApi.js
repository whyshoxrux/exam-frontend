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

    // updateUser: builder.mutation({
    //     query: (data) => ({
    //         url: '/users/update',
    //         method: 'PUT',
    //         body: data
    //     }),
    //     invalidatesTags: ['User']
    // }),
    // updateProfilePicture: builder.mutation({
    //     query: (file) => {
    //         const formData = new FormData();
    //         formData.append('file', file);
    //         return {
    //             url: '/users/upload',
    //             method: 'POST',
    //             body: formData,
    //             formData: true,
    //         };
    //     },
    //     invalidatesTags: ['User']
    // })
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetOneProductQuery,
  // useUpdateUserMutation,
  // useUpdateProfilePictureMutation
} = userApi;
