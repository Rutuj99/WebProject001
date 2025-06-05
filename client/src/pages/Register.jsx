import React, { useState } from 'react';
import { Box, Button, Input, Heading, VStack, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        toast({ title: 'Registration successful', status: 'success' });
        navigate('/login');
      } else {
        toast({ title: data.message, status: 'error' });
      }
    } catch (err) {
      toast({ title: 'Registration failed', status: 'error' });
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt={24} p={6} bg="white" borderRadius="md" boxShadow="md">
      <Heading mb={6}>Register</Heading>
      <VStack spacing={4}>
        <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button colorScheme="blue" w="full" onClick={handleRegister}>Register</Button>
        <Button variant="link" onClick={() => navigate('/login')}>Back to Login</Button>
      </VStack>
    </Box>
  );
}

export default Register;