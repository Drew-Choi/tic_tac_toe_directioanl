import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { isMobile, isTablet } from 'react-device-detect';
import Home from './views/main/Home';
import Settings from './views/main/Settings';
import Start from './views/main/Start';
import History from './views/main/History';
import Container from '@mui/material/Container';
import Header from './views/header_footer/Header';
import Footer from './views/header_footer/Footer';
import { useSetRecoilState } from 'recoil';
import { isMobileValue } from './recoil/isMobileValue';
import COLOR_LIST from './style/COLOR_LIST';

function App() {
  // 모바일체크 전역 설정
  const setIsMobileValue = useSetRecoilState(isMobileValue);
  useEffect(() => {
    setIsMobileValue(() => isTablet || isMobile);
  }, []);

  return (
    <>
      <Header />
      <Container
        className="App"
        component="main"
        maxWidth="md"
        sx={{
          position: 'relative',
          minHeight: '80vh',
          borderRight: '1px solid' + COLOR_LIST.DARK_GRAY,
          borderLeft: '1px solid' + COLOR_LIST.DARK_GRAY,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/start" element={<Start />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
