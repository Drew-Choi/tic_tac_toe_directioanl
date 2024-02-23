import React, { CSSProperties } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from '@mui/material/GlobalStyles';
import { RecoilRoot } from 'recoil';
import COLOR_LIST from './style/COLOR_LIST';

const globalStyle: { [key: string]: CSSProperties } = {
  body: {
    backgroundColor: COLOR_LIST.BG_MAIN,
    margin: '0',
    padding: '0',
  },
  p: { margin: '0' },
  a: { textDecoration: 'none', color: 'inherit' },
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
  // 컬러피커
  '.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedStart.css-1ua80n0-MuiInputBase-input-MuiOutlinedInput-input':
    {
      display: 'none',
    },
  '.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-sizeSmall.MuiInputBase-adornedStart.css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root':
    {
      padding: '0',
    },
  '.MuiInputAdornment-root.MuiInputAdornment-positionStart.MuiInputAdornment-outlined.MuiInputAdornment-sizeSmall.css-ittuaa-MuiInputAdornment-root':
    {
      margin: '0',
    },
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        {/* 전역스타일 */}
        <GlobalStyles styles={globalStyle} />
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
