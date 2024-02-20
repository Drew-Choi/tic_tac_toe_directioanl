import Container from '@mui/material/Container';
import React from 'react';

const Header = () => {
  return (
    <Container
      className="App"
      component="header"
      maxWidth="md"
      sx={{ position: 'relative', bgcolor: 'beige' }}
    >
      Header
    </Container>
  );
};

export default Header;
