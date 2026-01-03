import React from 'react';

import { toast } from 'react-toastify';
import { Alert, useTheme } from '@mui/material';
import { CheckCircleOutline, X } from '@mui/icons-material';

export const useSnackbar = () => {
  const theme = useTheme();
  const enqueueSuccess = (msg: string) => {
    toast(
      (t) => (
        <Alert severity="success" sx={{ width: 1 }} onClose={() => t?.closeToast()}>
          {msg}
        </Alert>
      ),
      {
        pauseOnHover: true,
        autoClose: 4000,
      }
    );
  };
  const enqueueError = (msg: string) => {
    toast(
      (t) => (
        <Alert severity="error" sx={{ width: 1 }} onClose={() => t?.closeToast()}>
          {msg}
        </Alert>
      ),
      {
        pauseOnHover: true,
        autoClose: 4000,
      }
    );
  };

  const enqueueWarning = (msg: string) => {
    toast(
      (t) => (
        <Alert severity="warning" sx={{ width: 1 }} onClose={() => t?.closeToast()}>
          {msg}
        </Alert>
      ),
      {
        pauseOnHover: true,
        autoClose: 4000,
      }
    );
  };

  const enqueueInfo = (msg: string) => {
    toast(
      (t) => (
        <Alert severity="info" sx={{ width: 1 }} onClose={() => t?.closeToast()}>
          {msg}
        </Alert>
      ),
      {
        pauseOnHover: true,
        autoClose: 4000,
      }
    );
  };

  return { enqueueSuccess, enqueueError, enqueueWarning, enqueueInfo };
};
