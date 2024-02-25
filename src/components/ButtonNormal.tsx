import React from 'react';
import Button from '@mui/material/Button';
import { SxProps } from '@mui/material';
import COLOR_LIST from '../style/COLOR_LIST';

type ButtonNormalPropsType = {
  children: React.ReactNode;
  sx?: SxProps;
  size?: 'small' | 'medium' | 'large';
  onClickEvent?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

const ButtonNormal = ({
  children,
  sx,
  size = 'medium',
  onClickEvent,
  type = 'button',
}: ButtonNormalPropsType) => {
  return (
    <Button
      onClick={onClickEvent}
      sx={{ color: COLOR_LIST.WHITE, borderColor: COLOR_LIST.POINT_BLUE, ...sx }}
      variant="outlined"
      size={size}
      type={type}
    >
      {children}
    </Button>
  );
};

export default React.memo(ButtonNormal);
