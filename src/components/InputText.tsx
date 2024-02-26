import React, { ChangeEvent, RefObject } from 'react';
import COLOR_LIST from '../style/COLOR_LIST';
import TextField from '@mui/material/TextField';
import { SxProps } from '@mui/material';

type InputTextPropsType = {
  label?: string;
  color?: string;
  inputRef?: RefObject<HTMLInputElement>;
  onChangeEvent?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  labelColor?: string;
  sx?: SxProps;
  textColor?: string;
  placeholder?: string;
};

const InputText = ({
  label = '',
  color = COLOR_LIST.WHITE,
  labelColor = COLOR_LIST.WHITE,
  inputRef,
  value,
  onChangeEvent,
  sx,
  textColor = COLOR_LIST.WHITE,
  placeholder,
}: InputTextPropsType) => {
  return (
    <TextField
      placeholder={placeholder}
      value={value}
      onChange={onChangeEvent}
      inputRef={inputRef}
      label={label}
      focused
      sx={{
        '.css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
          {
            borderColor: color,
          },
        '.css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
          color: labelColor,
        },
        '.MuiInputBase-input.MuiOutlinedInput-input.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input':
          {
            color: textColor,
          },
        ...sx,
      }}
    />
  );
};
export default InputText;
