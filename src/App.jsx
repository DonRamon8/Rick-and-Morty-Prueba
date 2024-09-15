import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import { CharacterProvider } from './context/CharacterContext';

const App = () => {
  return (
    <CharacterProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </CharacterProvider>
  );
};

export default App;
