import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Box, Spinner, Flex, Input, useToast } from '@chakra-ui/react';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const toast = useToast();

  const fetchTasks = async (p = 1) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`https://webproject001.onrender.com/api/tasks?page=${p}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setTasks(data.tasks);
        setPages(data.pages);
        setPage(data.page);
      }
    } catch (err) {}
    setLoading(false);
  };

  useEffect(() => { fetchTasks(page); }, [page]);

  const handleCreate = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('https://webproject001.onrender.com/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, description })
      });
      if (res.ok) {
        toast({ title: 'Task created', status: 'success' });
        setTitle('');
        setDescription('');
        fetchTasks(page);
      } else {
        const data = await res.json();
        toast({ title: data.message, status: 'error' });
      }
    } catch (err) {
      toast({ title: 'Failed to create task', status: 'error' });
    }
  };

  const handlePageChange = (p) => {
    fetchTasks(p);
  };

  if (loading) return <Spinner size="xl" />;

  return (
    <Box>
      <Box mb={4} p={4} bg="white" borderRadius="md" boxShadow="sm">
        <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} mb={2} />
        <Input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} mb={2} />
        <Button colorScheme="blue" onClick={handleCreate}>Create Task</Button>
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Status</Th>
            <Th>Created By</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tasks.map(task => (
            <Tr key={task._id}>
              <Td>{task.title}</Td>
              <Td>{task.description}</Td>
              <Td>{task.status}</Td>
              <Td>{task.createdBy?.username || '-'}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex mt={4} gap={2}>
        {[...Array(pages)].map((_, i) => (
          <Button
            key={i}
            colorScheme={page === i + 1 ? 'blue' : 'gray'}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </Flex>
    </Box>
  );
}

export default TaskList;