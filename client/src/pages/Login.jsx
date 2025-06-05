import React, { useState } from 'react';
import { Box, Button, Input, Heading, VStack, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch('https://webproject001.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      } else {
        toast({ title: data.message, status: 'error' });
      }
    } catch (err) {
      toast({ title: 'Login failed', status: 'error' });
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt={24} p={6} bg="white" borderRadius="md" boxShadow="md">
      <Heading mb={6}>Login</Heading>
      <VStack spacing={4}>
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button colorScheme="blue" w="full" onClick={handleLogin}>Login</Button>
        <Button variant="link" onClick={() => navigate('/register')}>Register</Button>
      </VStack>
    </Box>
  );
}

export default Login;