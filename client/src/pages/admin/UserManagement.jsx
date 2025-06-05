import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Select, Spinner, Box, useToast } from '@chakra-ui/react';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchUsers = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setUsers(data);
      else toast({ title: data.message, status: 'error' });
    } catch (err) {
      toast({ title: 'Failed to fetch users', status: 'error' });
    }
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleStatusChange = async (id, status) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/users/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (res.ok) {
        toast({ title: 'Status updated', status: 'success' });
        fetchUsers();
      } else {
        toast({ title: data.message, status: 'error' });
      }
    } catch (err) {
      toast({ title: 'Failed to update status', status: 'error' });
    }
  };

  if (loading) return <Spinner size="xl" />;

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map(user => (
            <Tr key={user._id}>
              <Td>{user.username}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td>{user.status}</Td>
              <Td>
                <Select
                  value={user.status}
                  onChange={e => handleStatusChange(user._id, e.target.value)}
                  isDisabled={user.role === 'admin'}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Select>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default UserManagement;