import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/Login/Login';
import EnterPhoneNumber from '../pages/EnterPhoneNumber/EnterPhoneNumber';
import Chat from '../pages/Chat/Chat';

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/enterPhoneNumber" element={<EnterPhoneNumber />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default Routing;

