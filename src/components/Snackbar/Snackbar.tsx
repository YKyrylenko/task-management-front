import React from "react";
import { Snackbar as MuiSnackbar } from "@mui/material";
import { useSnackbarService } from "../../services/snackbar/snackbar.service";

const Snackbar = () => {
  const { open, message, hideSnackbar } = useSnackbarService();

  return (
    <MuiSnackbar
      open={open}
      onClose={hideSnackbar}
      autoHideDuration={4000}
      message={message}
    />
  );
};

export default Snackbar;
