import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack, TextField, Typography, useTheme } from '@mui/material';
import { useAuthMutation } from '~/hooks/useAuthMutation';
import { SubmitHandler, useForm } from 'react-hook-form';
import PasswordInput from '~/base/components/PasswordInput';

type LoginFormData = {
  username: string;
  password: string;
};

function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { mUserLogin } = useAuthMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const res = await mUserLogin.mutateAsync(
      {
        username: data?.username,
        password: data?.password,
      },
      {
        onSuccess: () => {
          navigate('/login');
        },
      }
    );
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack sx={{ background: theme.palette.common.white, p: 3, borderRadius: 3, width: 600 }} spacing={3}>
          <Typography variant="h1" fontWeight={500} textAlign="center">
            Welcome back
          </Typography>
          <TextField
            label="Username"
            helperText={errors.username?.message}
            error={!!errors.username}
            {...register('username', { required: true, maxLength: 50 })}
          />
          <PasswordInput
            label="Password"
            helperText={errors.password?.message}
            error={!!errors.password}
            {...register('password', { required: true, maxLength: 50 })}
          />
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" py={1}>
            <Typography>Don't have an account yet?</Typography>
            <Box sx={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>
              <Typography color={theme.palette.primary.main}>Register one for free</Typography>
            </Box>
          </Stack>
          <Button type="submit" variant="contained">
            Log in
          </Button>
        </Stack>
      </form>
    </section>
  );
}

export default Login;
