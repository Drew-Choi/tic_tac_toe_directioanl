import { SxProps } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { ReactNode } from 'react';
import MenuItem from '@mui/material/MenuItem';
//MuiSlider-markLabel MuiSlider-markLabel MuiSlider-markLabelActive css-1eoe787-MuiSlider-markLabel
type SelectotPropsType = {
  value: string;
  onChangeEvent: (e: SelectChangeEvent<string>) => void;
  selectData: { value: number | string; label: string | number | ReactNode }[];
  activeColor?: string;
  containerSx?: SxProps;
  disableValue?: number;
  dropMenuSx?: SxProps;
};

const Selector = ({
  disableValue,
  value,
  onChangeEvent,
  activeColor,
  containerSx,
  selectData,
  dropMenuSx,
}: SelectotPropsType) => {
  return (
    <Select
      value={value}
      onChange={onChangeEvent}
      sx={{
        width: '65px',
        display: 'inline-flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        border: 'solid 0.5px #ececec',
        color: activeColor ? activeColor : 'black',
        fontSize: '20px',
        // mui selectCustom
        '.MuiOutlinedInput-notchedOutline.css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
          display: 'none',
        },
        '.MuiSelect-nativeInput.css-yf8vq0-MuiSelect-nativeInput': {
          display: 'none',
        },
        '.MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':
          {
            padding: '5px 30px 5px 10px',
          },
        '.MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input svg':
          {
            position: 'relative',
            transform: 'translateY(10%)',
          },
        '.MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.MuiSelect-icon.MuiSelect-iconOutlined.css-hfutr2-MuiSvgIcon-root-MuiSelect-icon':
          {
            color: 'white',
          },
        ...containerSx,
      }}
    >
      {selectData.map((el) =>
        disableValue !== undefined ? (
          Number(disableValue) !== el.value ? (
            <MenuItem key={el.value} value={el.value} sx={{ ...dropMenuSx }}>
              {el.label}
            </MenuItem>
          ) : (
            <MenuItem disabled key={el.value} value={el.value} sx={{ ...dropMenuSx }}>
              {el.label}
            </MenuItem>
          )
        ) : (
          <MenuItem key={el.value} value={el.value} sx={{ ...dropMenuSx }}>
            {el.label}
          </MenuItem>
        ),
      )}
    </Select>
  );
};

export default React.memo(Selector);
