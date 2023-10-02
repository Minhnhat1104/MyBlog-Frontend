import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface LoadingCircularProps {
  loading?: boolean;
}

function LoadingCircular(props: LoadingCircularProps) {
  const { loading } = props;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
      <CircularProgress />
    </Box>
  );
}

export default LoadingCircular;
