import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { baseUrl } from "../axiosBaseUrl/api";
import {UserI} from "../modelTypesUser/model"


interface UsersState {
  user: UserI;
  loading: boolean;
  error: string;
}

const initialState = {
  user: {},
  loading: false,
  error: "",
} as UsersState;

export const fetchUser = createAsyncThunk("user/fetchUser", async (id:string|undefined) => {
  return await baseUrl.get<UserI>(`/contact/${id}/`).then((res) => res.data);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<UserI>) => {
        state.loading = false;
        state.user = action.payload;
      }
    );
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
     
      state.error = action.error.message || "Something wen wrong";
    });
  },
});

export default userSlice.reducer;
