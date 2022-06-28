import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserI } from "../modelTypesUser/model";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://frontend-candidate.dev.sdh.com.ua/v1",
  }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    fetchAllusers: build.query<UserI[], number>({
      query: () => ({
        url: "/contact/",
      }),
      providesTags: (result) => ["Users"],
    }),
    fetchUser: build.query<UserI, any>({
      query: (id: number) => ({
        url: `/contact/${id}/`,
      }),
      providesTags: (result) => ["Users"],
    }),

    createUser: build.mutation<UserI, UserI>({
      query: (data) => ({
        url: "/contact/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: build.mutation<UserI, UserI>({
      query: (user) => ({
        url: `/contact/${user.id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: build.mutation<UserI, UserI>({
      query: (user) => ({
        url: `/contact/${user.id}/`,
        method: "PUT",
        body:user
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});
