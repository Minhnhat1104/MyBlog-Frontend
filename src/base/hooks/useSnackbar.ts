import React from 'react';

import { toast } from 'react-toastify';
import { useTheme } from '@mui/material';

export const useSnackbar = () => {
  const theme = useTheme();
  const enqueueSuccess = (msg: string) => {
    toast.success(msg, {
      pauseOnHover: true,
      autoClose: 3000,
    });
  };
  const enqueueError = (msg: string) => {
    toast.error(msg, {
      pauseOnHover: true,
      autoClose: 3000,
    });
  };

  return { enqueueSuccess, enqueueError };
};
