import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      background: '#1e3a8a',
      color: 'white',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <p>&copy; {new Date().getFullYear()} Santorini Café. All rights reserved.</p>
    </footer>
  );
};

export default Footer;