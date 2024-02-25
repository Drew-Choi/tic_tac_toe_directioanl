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
      sx={{
        border: 'solid 0.5px white',
        borderRadius: '5px',
        '.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedStart.css-1ua80n0-MuiInputBase-input-MuiOutlinedInput-input':
          {
            display: 'none',
          },
        '.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-sizeSmall.MuiInputBase-adornedStart.css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root':
          {
            border: 'none',
            padding: '20px 10px',
          },
        '.MuiInputAdornment-root.MuiInputAdornment-positionStart.MuiInputAdornment-outlined.MuiInputAdornment-sizeSmall.css-ittuaa-MuiInputAdornment-root':
          {
            margin: '0',
          },
        '.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium.MuiColorInput-Button.css-1wiqpwl-MuiButtonBase-root-MuiButton-root':
          {},
        ...sx,
      }}
      value={value}
      format="hex"
      size="small"
      variant="outlined"
      onChange={onChangeEvent}
    />
  );
};

export default React.memo(ColorPicker);
