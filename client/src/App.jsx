import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import AdminPanel from './pages/AdminPanel';
import UserPanel from './pages/UserPanel';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Routes>
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/user/*" element={<UserPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Box>
  );
}

export default App;