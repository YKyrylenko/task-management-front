import { useCallback } from "react";
import {
  getUsersAction,
  selectIsLoading,
  selectUsers,
} from "../../features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { User } from "./users.types";

type UsersServiceOperators = {
  users: User[];
  isLoading: boolean;
  getUsers: () => void;
};

export const useUsersService = (): Readonly<UsersServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    users: useAppSelector(selectUsers),
    isLoading: useAppSelector(selectIsLoading),
    getUsers: useCallback(() => {
      dispatch(getUsersAction());
    }, [dispatch]),
  };
};
