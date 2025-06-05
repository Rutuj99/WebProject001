import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Box, Flex, Button } from '@chakra-ui/react';
import UserManagement from './admin/UserManagement';
import TaskManagement from './admin/TaskManagement';

function AdminPanel() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <Box>
      <Flex bg="blue.600" color="white" p={4} justify="space-between">
        <Flex gap={4}>
          <Button as={Link} to="users" variant="ghost" color="white">Users</Button>
          <Button as={Link} to="tasks" variant="ghost" color="white">Tasks</Button>
        </Flex>
        <Button onClick={handleLogout} colorScheme="red">Logout</Button>
      </Flex>
      <Box p={4}>
        <Routes>
          <Route path="users" element={<UserManagement />} />
          <Route path="tasks" element={<TaskManagement />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default AdminPanel;