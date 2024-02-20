import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import React, { ChangeEvent, FormEvent, useRef } from 'react';
import COLOR_LIST from '../../style/COLOR_LIST';
import { useSetRecoilState } from 'recoil';
import { groundInputValue } from '../../recoil/ground';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const inputValueRef = useRef<HTMLInputElement>(null);
  const setGroundValue = useSetRecoilState(groundInputValue);
  const navigate = useNavigate();

  const inputHandler = (e: FormEvent) => {
    e.preventDefault();

    if (inputValueRef.current?.value) {
      setGroundValue(Number(inputValueRef.current.value));
      navigate('/settings/start');
    }
  };

  return (
    <Box
      color="white"
      component="section"
      sx={{ position: 'relative', boxSizing: 'border-box', width: '100%', padding: '30px' }}
    >
      <Box>
        <form onSubmit={inputHandler}>
          <input ref={inputValueRef} type="number" min="3" max="10" />
          <button type="submit">등록</button>
        </form>
      </Box>
    </Box>
  );
};

export default Settings;
