import React from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import TaskList from './user/TaskList';

function UserPanel() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <Box>
      <Flex bg="blue.600" color="white" p={4} justify="space-between">
        <Box fontWeight="bold">User Panel</Box>
        <Button onClick={handleLogout} colorScheme="red">Logout</Button>
      </Flex>
      <Box p={4}>
        <TaskList />
      </Box>
    </Box>
  );
}

export default UserPanel;