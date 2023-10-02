import { Box, Button, IconButton, Stack, Switch, Typography, useTheme } from '@mui/material';
import classNames from 'classnames/bind';
import style from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { createAxios } from '~/tools/createInstance';
import { logoutUser } from '~/tools/apiRequest';
import { loginSuccess } from '~/redux/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faUpload } from '@fortawesome/free-solid-svg-icons';
import Logo from '~/assets/img/logo';
import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import useConfig from '~/base/hooks/useConfig';
import { ThemeMode } from '~/base/types/config';

const cx = classNames.bind(style);

function Header() {
  const user = useSelector((state: any) => state.auth.login?.currentUser);
  const theme = useTheme();
  const { mode, onChangeMode } = useConfig();
  const accessToken = user?.accessToken;
  const id = user?._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleLogout = () => {
    logoutUser(dispatch, id, navigate, accessToken, axiosJWT);
  };

  return (
    <Box
      className={cx('wrapper')}
      px={2}
      sx={{
        boxShadow: `0 3px 6px ${theme.palette.divider}`,
        background: theme.palette.background.paper,
      }}
    >
      <Stack direction="row" alignItems="center" className={cx('inner')}>
        <Link to="/">
          <Stack direction="row" alignItems="center" spacing={1} height={'100%'}>
            <Logo />
            <Typography color="primary" fontWeight="600" fontSize={'20px'}>
              My Blog
            </Typography>
          </Stack>
        </Link>
        {user ? (
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton size="medium" href="/upload">
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
  );
}

export default Header;
