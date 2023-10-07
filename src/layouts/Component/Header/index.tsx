import { Box, Button, IconButton, Stack, Switch, Typography, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { createAxios } from '~/tools/createInstance';
import { logoutUser } from '~/tools/apiRequest';
import { loginSuccess } from '~/redux/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faUpload } from '@fortawesome/free-solid-svg-icons';
import Logo from '~/assets/img/logo';
import React, { useState } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import useConfig from '~/base/hooks/useConfig';
import Write from '~/pages/Write';
import { defaultLayoutHeaderHeight, defaultLayoutWidth } from '~/base/config/config';

function Header() {
  const user = useSelector((state: any) => state.auth.login?.currentUser);
  const theme = useTheme();
  const { mode, onChangeMode } = useConfig();
  const accessToken = user?.accessToken;
  const id = user?._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [openWrite, setOpenWrite] = useState<boolean>(false);

  const handleLogout = () => {
    logoutUser(dispatch, id, navigate, accessToken, axiosJWT);
  };

  return (
    <>
      <Box
        px={2}
        sx={{
          width: '100%',
          height: defaultLayoutHeaderHeight,
          // position: 'fixed',
          top: 0,
          zIndex: 1,
          boxShadow: `0 3px 6px ${theme.palette.divider}`,
          background: theme.palette.background.paper,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            margin: 'auto',
            width: defaultLayoutWidth,
            maxWidth: '100%',
            height: '100%',
            padding: '0 30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link to="/">
            <Stack direction="row" alignItems="center" spacing={1} height={'100%'}>
              <Logo />
              <Typography
                color="primary"
                fontWeight="600"
                fontSize={'20px'}
                fontStyle={'unset'}
                sx={{ textDecoration: 'none' }}
              >
                My Blog 2
              </Typography>
            </Stack>
          </Link>
          {user ? (
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton size="medium" onClick={() => setOpenWrite(true)}>
                <FontAwesomeIcon icon={faUpload as IconProp} />
              </IconButton>
              <IconButton size="medium" href="/">
                <FontAwesomeIcon icon={faImage as IconProp} />
              </IconButton>
              <Switch
                checked={mode === 'light'}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
                  onChangeMode(checked ? 'light' : 'dark')
                }
              />
              <Typography pr={1}>{user.username}</Typography>
              <Button size="medium" variant="outlined" onClick={handleLogout}>
                Log Out
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Button href="/login">Login</Button>
              <Button variant="outlined" href="/Register">
                Register
              </Button>
            </Stack>
          )}
        </Stack>
      </Box>

      {openWrite && <Write isOpen={openWrite} onClose={() => setOpenWrite(false)} />}
    </>
  );
}

export default Header;
