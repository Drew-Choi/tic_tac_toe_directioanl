import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Settings from './views/Settings';
import Start from './views/Start';
import History from './views/History';
import { Container } from '@mui/material';

function App() {
  return (
    <Container className="App" component="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/start" element={<Start />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Container>
  );
}

export default App;
