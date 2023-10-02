import { Typography } from '@mui/material';
import React from 'react';
import { useRef } from 'react';

const Counter = (props: any) => {
  const renderCounter = useRef(0);
  renderCounter.current = renderCounter.current + 1;
  return <Typography py={1}>Renders: {renderCounter.current}</Typography>;
};

export default Counter;
