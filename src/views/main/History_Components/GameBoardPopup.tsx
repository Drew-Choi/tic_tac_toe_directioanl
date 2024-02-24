import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import COLOR_LIST from '../../../style/COLOR_LIST';
import { ImCancelCircle } from 'react-icons/im';

type GameBoardPopupPropsType = {
  onClickCancel: () => void;
  historyData: LocalStorageHistoryType;
};

const GameBoardPopup = ({ onClickCancel, historyData }: GameBoardPopupPropsType) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: '999',
        bgcolor: COLOR_LIST.DARK_GRAY,
        width: { xs: '95vw', md: '900px' },
        height: { xs: '60vh', md: '70vh' },
        borderRadius: '10px',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <Box></Box>
        <ImCancelCircle size={25} onClick={onClickCancel} />
      </Box>
      <Grid
        container
        sx={{
          position: 'relative',
          margin: 'auto',
        }}
      ></Grid>
    </Box>
  );
};

export default GameBoardPopup;
