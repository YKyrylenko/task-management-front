import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UsersState } from "./types";
import { RootState } from "../../app/store";
import { User } from "../../services/users/users.types";

const initialState: UsersState = {
  users: [],
  isLoading: false,
  errors: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsersAction: (state: UsersState) => {
      state.isLoading = true;
    },
    getUsersSuccessAction: (
      state: UsersState,
      { payload: users }: PayloadAction<User[]>
    ) => {
      state.users = users;
      state.isLoading = false;
    },
    getUsersErrorAction: (state: UsersState) => {
      state.isLoading = false;
    },
  },
});

export const { getUsersAction, getUsersErrorAction, getUsersSuccessAction } =
  usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;
export const selectIsLoading = (state: RootState) => state.users.isLoading;

export default usersSlice.reducer;
