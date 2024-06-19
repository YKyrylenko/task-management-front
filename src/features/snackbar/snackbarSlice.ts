import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SnackbarState } from "./types";
import { RootState } from "../../app/store";

const initialState: SnackbarState = {
  open: false,
  message: "",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbarAction: (
      state: SnackbarState,
      { payload: message }: PayloadAction<string>
    ) => {
      state.open = true;
      state.message = message;
    },
    hideSnackbarAction: (state: SnackbarState) => {
      state.open = false;
    },
  },
});

export const { hideSnackbarAction, showSnackbarAction } = snackbarSlice.actions;

export const selectSnackbarOpen = (state: RootState) => state.snackbar.open;
export const selectSnackbarMessage = (state: RootState) =>
  state.snackbar.message;

export default snackbarSlice.reducer;
