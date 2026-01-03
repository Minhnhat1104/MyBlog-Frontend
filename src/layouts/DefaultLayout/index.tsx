import Header from '../Component/Header';
import React from 'react';
import { Box, Stack } from '@mui/material';
import { defaultLayoutHeaderHeight, defaultLayoutWidth } from '~/base/config/config';

function BackgroundLayout({ children }: any) {
  return (
    <Stack height={'100vh'}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          webkitBackgroundSize: 'cover',
          mozBackgroundSize: 'cover',
          oBackgroundSize: 'cover',
          backgroundSize: 'cover',
          zIndex: -1,
        }}
      ></Box>
      <Header />

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          mx: 3,
          overflowY: 'auto',
        }}
      >
        {children}
      </Box>
    </Stack>
  );
}

export default BackgroundLayout;
