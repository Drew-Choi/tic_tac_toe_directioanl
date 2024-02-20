import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './views/main/Home';
import Settings from './views/main/Settings';
import Start from './views/main/Start';
import History from './views/main/History';
import Container from '@mui/material/Container';
import Header from './views/header_footer/Header';
import Footer from './views/header_footer/Footer';

function App() {
  return (
    <>
      <Header />
      <Container
        className="App"
        component="main"
        maxWidth="md"
        sx={{ flex: '9', position: 'relative' }}
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
