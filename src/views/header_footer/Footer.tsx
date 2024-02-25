import Container from '@mui/material/Container';
import React from 'react';
import COLOR_LIST from '../../style/COLOR_LIST';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Footer = () => {
  return (
    <Container
      component="footer"
      maxWidth="md"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        boxSizing: 'border-box',
        height: '10vh',
        bgcolor: COLOR_LIST.DARK_GRAY,
        color: COLOR_LIST.WHITE,
        borderRadius: '0 0 50px 50px',
      }}
    >
      <Typography fontSize="12px" fontWeight={600}>
        Tic Tac Toe Game
      </Typography>
      <Box>
        <Typography textAlign="right" fontSize="10px" marginBottom="5px">
          ® Directional
        </Typography>
        <Typography textAlign="right" fontSize="10px">
          Dev. Drew-Choi
        </Typography>
      </Box>
    </Container>
  );
};

export default Footer;
