import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface LoadingCircularProps {
  loading?: boolean;
}

function LoadingCircular({ loading }: LoadingCircularProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
      <CircularProgress sx={{ margin: 'auto' }} />
    </Box>
  );
}

export default LoadingCircular;
