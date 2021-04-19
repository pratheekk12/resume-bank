import React from 'react';

const Logo = props => {
  return (
    <img
      alt="Logo"
      src="/grassroots.png"
      {...props}
      style={{ height: '50px', width: '130px' }}
    />
  );
};

export default Logo;