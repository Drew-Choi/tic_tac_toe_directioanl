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
