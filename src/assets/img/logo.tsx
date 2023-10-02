import React from 'react';
import logo from './Logo.png';

const logoImage = ({ width = '2.4rem', height = '2.4rem', className, ...props }: any) => {
  return <img style={{ width: 40, height: 40 }} src={logo} alt="Logo" />;
};

export default logoImage;
