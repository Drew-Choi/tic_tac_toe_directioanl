import { SxProps } from '@mui/material';
import { MuiColorInput } from 'mui-color-input';
import React from 'react';

type ColorPickerPropsType = {
  value: string;
  sx?: SxProps;
  onChangeEvent: (color: string) => void;
};

const ColorPicker = ({ value, sx, onChangeEvent }: ColorPickerPropsType) => {
  return (
    <MuiColorInput
      sx={{ border: 'solid 0.5px white', borderRadius: '5px', padding: '20px 10px', ...sx }}
      value={value}
      format="hex"
      size="small"
      variant="outlined"
      onChange={onChangeEvent}
    />
  );
};

export default React.memo(ColorPicker);
