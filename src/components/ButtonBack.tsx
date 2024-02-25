import React from 'react';
import Button from '@mui/material/Button';
import { SxProps } from '@mui/material';
import COLOR_LIST from '../style/COLOR_LIST';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

type ButtonBackPropsType = {
  sx?: SxProps;
  size?: 'small' | 'medium' | 'large';
  iconSize?: number;
  addEvents?: (() => void) | undefined;
};

export const ButtonBack = ({ sx, size, iconSize = 20, addEvents }: ButtonBackPropsType) => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        addEvents?.();
        navigate(-1);
      }}
      sx={{
        color: COLOR_LIST.WHITE,
        borderColor: COLOR_LIST.GRAY,
        padding: '10px',
        ...sx,
      }}
      variant="outlined"
      size={size}
    >
      <IoIosArrowBack size={iconSize} />
    </Button>
  );
};

export default ButtonBack;
