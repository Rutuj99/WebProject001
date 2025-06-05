import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Box, Spinner, Checkbox, Flex } from '@chakra-ui/react';

function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

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

  const handleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handlePageChange = (p) => {
    fetchTasks(p);
  };

  if (loading) return <Spinner size="xl" />;

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Select</Th>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Status</Th>
            <Th>Assigned To</Th>
            <Th>Created By</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tasks.map(task => (
            <Tr key={task._id}>
              <Td>
                <Checkbox
                  isChecked={selected.includes(task._id)}
                  onChange={() => handleSelect(task._id)}
                />
              </Td>
              <Td>{task.title}</Td>
              <Td>{task.description}</Td>
              <Td>{task.status}</Td>
              <Td>{task.assignedTo?.username || '-'}</Td>
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

export default TaskManagement;