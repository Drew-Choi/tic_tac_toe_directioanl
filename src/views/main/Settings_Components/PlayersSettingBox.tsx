import React, { ChangeEvent, ReactNode, RefObject } from 'react';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import InputText from '../../../components/InputText';
import Selector from '../../../components/Selector';
import ColorPicker from '../../../components/ColorPicker';
import COLOR_LIST from '../../../style/COLOR_LIST';
import { SelectChangeEvent, SxProps, Typography } from '@mui/material';

type PlayersSettingBoxPropsType = {
  playerNameRef: RefObject<HTMLInputElement>;
  inputLabel?: string;
  inputColor?: string;
  selectData: { value: number | string; label: ReactNode | string }[];
  selectValue?: string;
  onChangeSelector?: (e: SelectChangeEvent<string>) => void;
  selectDisableValue?: number;
  selectActiveColor?: string;
  colorPickerValue?: string;
  onChangeColorPicker?: (color: string) => void;
  radioChecked?: boolean;
  radioId?: string;
  radioName?: string;
  radioValue?: string;
  onChangeRadio?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputSx?: SxProps;
  containerSx?: SxProps;
};

const PlayersSettingBox = ({
  playerNameRef,
  inputLabel = '',
  inputColor = COLOR_LIST.BRIGHT_GRAY,
  selectData,
  selectValue,
  onChangeSelector,
  selectDisableValue,
  selectActiveColor,
  colorPickerValue,
  onChangeColorPicker,
  radioChecked = false,
  radioId = '',
  radioName = '',
  radioValue = '',
  onChangeRadio,
  containerSx,
}: PlayersSettingBoxPropsType) => {
  return (
    <Box sx={{ ...containerSx }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        <InputText
          sx={{ width: '150px' }}
          inputRef={playerNameRef}
          label={inputLabel}
          color={inputColor}
        />
        <Selector
          selectData={selectData}
          value={selectValue || ''}
          onChangeEvent={(e) => {
            onChangeSelector ? onChangeSelector(e) : null;
          }}
          disableValue={selectDisableValue}
          activeColor={selectActiveColor}
        />
        <ColorPicker
          value={colorPickerValue || ''}
          onChangeEvent={(e) => {
            onChangeColorPicker ? onChangeColorPicker(e) : null;
          }}
        />
        <Radio
          checked={radioChecked}
          id={radioId}
          name={radioName}
          value={radioValue}
          onChange={onChangeRadio}
        />
      </Box>
      <Typography fontSize="12px" textAlign="right">
        *순서 미체크시 랜덤
      </Typography>
    </Box>
  );
};
export default React.memo(PlayersSettingBox);
