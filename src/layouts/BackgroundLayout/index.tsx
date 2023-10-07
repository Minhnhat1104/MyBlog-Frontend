import Header from '../Component/Header';
import React from 'react';
import { Box, Stack } from '@mui/material';
import { defaultLayoutHeaderHeight, defaultLayoutWidth } from '~/base/config/config';
import background from 'src/assets/img/img.jpg';

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
          background: `url(${background}) no-repeat center center fixed`,
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
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1,
        }}
        className="scroll-box"
      >
        <Box
          sx={{
            width: defaultLayoutWidth,
            display: 'flex',
          }}
        >
          <Box
            sx={{
              flex: 1,
              minHeight: `calc(100vh - ${defaultLayoutHeaderHeight})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              flexDirection: 'column',
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}

export default BackgroundLayout;
