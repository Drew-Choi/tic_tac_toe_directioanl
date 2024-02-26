import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import COLOR_LIST from '../../../style/COLOR_LIST';

const HistoryCard = ({
  el,
  onClickEvent,
}: {
  el: LocalStorageHistoryType;
  onClickEvent?: () => void;
}) => {
  return (
    <Box
      sx={{
        cursor: 'pointer',
        marginBottom: '20px',
        bgcolor: COLOR_LIST.DARK_GRAY,
        padding: '10px 20px',
        borderRadius: '10px',
      }}
      onClick={onClickEvent}
    >
      <Box>
        <Typography>{el?.time}</Typography>
        <Box
          sx={{
            display: { xs: 'block', sm: 'flex' },
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Typography>
            {el.gameCondition?.ground} x {el.gameCondition?.ground} GAME
          </Typography>
          <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>|</Typography>
          <Typography>{el.gameCondition.victoryCondition} BINGO</Typography>
          <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>|</Typography>
          <Typography>
            <span style={{ fontWeight: '600' }}>
              {el.players[0]?.name} {el.winner === 0 ? '(승)' : ''}
            </span>{' '}
            vs{' '}
            <span style={{ fontWeight: '600' }}>
              {el.players[1]?.name} {el.winner === 1 ? '(승)' : ''}
            </span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(HistoryCard);
