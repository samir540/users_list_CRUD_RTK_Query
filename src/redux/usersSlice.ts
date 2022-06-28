import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { baseUrl } from "../axiosBaseUrl/api";
import {UserI} from "../modelTypesUser/model"


interface UsersState {
  users: UserI[];
  loading: boolean;
  error: string;
}

const initialState = {
  users: [],
  loading: false,
  error: "",
} as UsersState;

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return await baseUrl.get<UserI[]>("/contact").then((res) => res.data);
});
export const deleteUser = createAsyncThunk("user/deleteUser", async (id:number) => {
  return await baseUrl.delete(`/contact/${id}/`).then((res) => res.data);
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<UserI[]>) => {
        state.loading = false;
        state.users = action.payload;
      }
    );
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(deleteUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users;
    });
  },
});

export default usersSlice.reducer;
