import { SxProps } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { ReactNode } from 'react';
import MenuItem from '@mui/material/MenuItem';

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
