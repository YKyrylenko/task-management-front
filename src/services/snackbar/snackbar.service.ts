import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  hideSnackbarAction,
  selectSnackbarMessage,
  selectSnackbarOpen,
  showSnackbarAction,
} from "../../features/snackbar/snackbarSlice";

type SnackbarServiceOperators = {
  open: boolean;
  message: string;
  showSnackbar: (message: string) => void;
  hideSnackbar: () => void;
};

export const useSnackbarService = (): Readonly<SnackbarServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    open: useAppSelector(selectSnackbarOpen),
    message: useAppSelector(selectSnackbarMessage),
    showSnackbar: useCallback(
      (message: string) => {
        dispatch(showSnackbarAction(message));
      },
      [dispatch]
    ),
    hideSnackbar: useCallback(() => {
      dispatch(hideSnackbarAction());
    }, [dispatch]),
  };
};
