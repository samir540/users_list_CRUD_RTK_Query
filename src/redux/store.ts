import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import userReducer from "./userSlice"
import { usersApi } from "../services/usersService";

// ...

const rootReducer = combineReducers({
  usersReducer,
  userReducer,
  [usersApi.reducerPath]: usersApi.reducer

});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(usersApi.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
