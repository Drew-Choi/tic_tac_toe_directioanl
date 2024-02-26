import React from 'react';
import Box from '@mui/material/Box';
import { usePopup } from './usePopup';
import COLOR_LIST from '../style/COLOR_LIST';
import Typography from '@mui/material/Typography';
import ButtonNormal from '../components/ButtonNormal';

const UsePopupComponent = () => {
  const { popup, closePopup } = usePopup();

  const { show, title, content, onStart, onHistory } = popup;

  if (!show) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        bgcolor: COLOR_LIST.BRIGHT_GRAY,
        top: '40%',
        left: '50%',
        boxSizing: 'border-box',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        zIndex: '999',
        padding: '30px',
      }}
    >
      <Typography textAlign="center" padding="20px" fontWeight={600} fontSize="20px">
        {title || '미입력'}
      </Typography>
      <Typography
        textAlign="center"
        padding="0 10px"
        height="120px"
        overflow="scroll"
        fontSize={18}
        marginBottom="5px"
        sx={{ wordBreak: 'break-all' }}
      >
        {content || '내용 미입력'}
      </Typography>
      <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
        {onStart && (
          <ButtonNormal
            onClickEvent={async () => {
              await onStart?.();
              closePopup();
            }}
            sx={{ color: COLOR_LIST.DARK_GRAY, borderColor: COLOR_LIST.DARK_GRAY }}
          >
            처음으로
          </ButtonNormal>
        )}
        {onHistory && (
          <ButtonNormal
            onClickEvent={async () => {
              await onHistory?.();
              closePopup();
            }}
            sx={{ color: COLOR_LIST.DARK_GRAY, borderColor: COLOR_LIST.DARK_GRAY }}
          >
            히스토리 보기
          </ButtonNormal>
        )}
        {!onStart && !onHistory && (
          <ButtonNormal
            onClickEvent={() => {
              closePopup();
            }}
            sx={{ color: COLOR_LIST.DARK_GRAY, borderColor: COLOR_LIST.DARK_GRAY }}
          >
            확인
          </ButtonNormal>
        )}
      </Box>
    </Box>
  );
};

export default UsePopupComponent;
