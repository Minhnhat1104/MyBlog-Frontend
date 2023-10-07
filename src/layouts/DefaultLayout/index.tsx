import Header from '../Component/Header';
import React from 'react';
import { Box, Stack } from '@mui/material';
import { defaultLayoutHeaderHeight, defaultLayoutHorizontalSpacer, defaultLayoutWidth } from '~/base/config/config';
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
          width: defaultLayoutWidth,
          height: `calc(100vh - ${defaultLayoutHeaderHeight})`,
          margin: 'auto',
        }}
      >
        <Box
          sx={{
            flex: 1,
            width: '100%',
            height: '100%',
            padding: `0 ${defaultLayoutHorizontalSpacer}`,
          }}
          className="scroll-box"
        >
          {children}
        </Box>
      </Box>
    </Stack>
  );
}

export default BackgroundLayout;
