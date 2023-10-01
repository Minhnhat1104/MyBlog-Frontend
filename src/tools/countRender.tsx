import React from 'react';
import { useRef } from 'react';

const Counter = (props: any) => {
  const renderCounter = useRef(0);
  renderCounter.current = renderCounter.current + 1;
  return (
    <h1>
      Renders: {renderCounter.current}, {props.message}
    </h1>
  );
};

export default Counter;
