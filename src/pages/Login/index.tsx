import React, { useState } from 'react';
import { Box, Button, InputLabel, Stack, TextField, Typography, useTheme } from '@mui/material';
import { loginUser } from '~/tools/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Login() {
  const theme = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };
    loginUser(user, dispatch, navigate);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        pb: 0,
        height: 'fitContent',
        margin: 'auto',
      }}
    >
      <Box sx={{ width: '500px' }}>
        <Typography sx={{ fontSize: 32, fontWeight: 500, color: theme.palette.primary.main, textAlign: 'center' }}>
          Log in
        </Typography>
        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
          <Stack spacing={1}>
            <Box width={'100%'}>
              <InputLabel>Username</InputLabel>
              <TextField
                fullWidth
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Box>
            <Box width={'100%'}>
              <InputLabel>Password</InputLabel>
              <TextField
                fullWidth
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Button type="submit" variant="contained">
              Continue
            </Button>
          </Stack>
        </form>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" py={1}>
          <Typography>Don't have an account yet?</Typography>
          <Box sx={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>
            <Typography color={theme.palette.primary.main}>Register one for free</Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default Login;
