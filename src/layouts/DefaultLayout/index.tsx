import Header from '../Component/Header';
import classNames from 'classnames/bind';
import style from './DefaultLayout.module.scss';
import React from 'react';
import { Box, useTheme } from '@mui/material';

const cx = classNames.bind(style);

function DefaultLayout({ children }: any) {
  const theme = useTheme();
  return (
    <>
      <Header />
      <Box className={cx('wrapper')}>
        <Box className={cx('container')}>
          <Box className={cx('content')}>{children}</Box>
        </Box>
      </Box>
    </>
  );
}

export default DefaultLayout;
