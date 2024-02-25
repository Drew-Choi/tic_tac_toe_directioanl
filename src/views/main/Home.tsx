import React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import COLOR_LIST from '../../style/COLOR_LIST';
import ButtonNormal from '../../components/ButtonNormal';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      color="white"
      component="section"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        boxSizing: 'border-box',
        width: '100%',
        height: '80vh',
        padding: '30px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <ButtonNormal
          sx={{ fontSize: '20px', padding: '20px 50px' }}
          onClickEvent={() => navigate('/settings')}
        >
          게임 시작하기
        </ButtonNormal>

        <ButtonNormal
          sx={{ fontSize: '20px', padding: '20px 50px', borderColor: COLOR_LIST.GRAY }}
          onClickEvent={() => navigate('/history')}
        >
          게임 히스토리 보기
        </ButtonNormal>
      </Box>
    </Box>
  );
};

export default Home;
