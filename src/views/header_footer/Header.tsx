import Container from '@mui/material/Container';
import React from 'react';
import COLOR_LIST from '../../style/COLOR_LIST';
import { Typography } from '@mui/material';
import ButtonBack from '../../components/ButtonBack';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { gameCondition } from '../../recoil/gameCondition';
import { playerInfo } from '../../recoil/player';
import ButtonNormal from '../../components/ButtonNormal';

const Header = () => {
  const pathName = useLocation().pathname;
  const navigate = useNavigate();
  // 게임 중 뒤로가기 초기화
  const setGameCondition = useSetRecoilState(gameCondition);
  const setPlayInfo = useSetRecoilState(playerInfo);

  return (
    <Container
      component="header"
      maxWidth="md"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        boxSizing: 'border-box',
        height: '10vh',
        bgcolor: COLOR_LIST.DARK_GRAY,
        color: COLOR_LIST.WHITE,
        borderRadius: '50px 50px 0 0',
      }}
    >
      {pathName !== '/' && pathName !== '/history' && (
        <ButtonBack
          sx={{ position: 'absolute', left: '20px' }}
          addEvents={() => {
            // 게임 중 뒤로가기 초기화
            if (pathName === '/settings/start') {
              setGameCondition((cur) => ({ ...cur, victoryCondition: 3, ground: null }));
              setPlayInfo([]);
            }
          }}
        />
      )}
      {(pathName === '/settings/start' || pathName === '/history') && (
        <ButtonNormal
          sx={{ position: 'absolute', right: '20px' }}
          onClickEvent={() => {
            setGameCondition((cur) => ({ ...cur, victoryCondition: 3, ground: null }));
            setPlayInfo([]);
            navigate('/');
          }}
        >
          처음으로
        </ButtonNormal>
      )}
      <Typography textAlign="center" fontSize="20px" fontWeight={600}>
        Tic Tac Toe Game
      </Typography>
    </Container>
  );
};

export default Header;
