import React from 'react';
import Slider from '@mui/material/Slider';
import { SxProps } from '@mui/material';
import COLOR_LIST from '../style/COLOR_LIST';

type SliderCustomPropsType = {
  defaultValue?: number;
  min?: number;
  max?: number;
  sx?: SxProps;
  size?: 'medium' | 'small';
  color?: string;
  labelColor?: string;
  labelFontSize?: string;
  valueLabelDisplay?: 'auto' | 'off' | 'on';
  marks: { value: number; label: string }[] | boolean;
  onChangeEvent?: (e: Event, value: number | number[], activeThumb: number) => void;
};

const SliderCustom = ({
  sx,
  marks,
  onChangeEvent,
  defaultValue = 3,
  max = 10,
  min = 3,
  size = 'medium',
  color = COLOR_LIST.BRIGHT_GRAY,
  labelColor = COLOR_LIST.WHITE,
  labelFontSize = '12px',
  valueLabelDisplay = 'auto',
}: SliderCustomPropsType) => {
  return (
    <Slider
      marks={marks}
      defaultValue={defaultValue}
      max={max}
      min={min}
      size={size}
      valueLabelDisplay={valueLabelDisplay}
      sx={{
        color: color,
        width: '100%',
        '.MuiSlider-markLabel': { color: labelColor, fontSize: labelFontSize },
        ...sx,
      }}
      onChange={onChangeEvent}
    />
  );
};
export default SliderCustom;
