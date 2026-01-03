import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface LoadingCircularProps {
  loading?: boolean;
  fullHeight?: boolean;
}

function LoadingCircular({ loading, fullHeight }: LoadingCircularProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 300,
        height: fullHeight ? '100%' : 300,
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default LoadingCircular;
