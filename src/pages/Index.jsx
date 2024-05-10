import { useState } from 'react';
import { Container, VStack, Input, Button, List, ListItem, ListIcon, IconButton, useToast } from '@chakra-ui/react';
import { FaTrash, FaEdit, FaPlusCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered',
        description: "Please enter a task before adding.",
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task));
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4}>
        <Input
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <IconButton
          aria-label="Add task"
          icon={<FaPlusCircle />}
          onClick={addTask}
          colorScheme="red"
        />
        <List spacing={3} w="full">
          {tasks.map(task => (
            <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center">
              <span>{task.text}</span>
              <div>
                <IconButton
                  aria-label="Edit task"
                  icon={<FaEdit />}
                  onClick={() => editTask(task.id, prompt('Edit task:', task.text))}
                  colorScheme="blue"
                  size="sm"
                  mr={2}
                />
                <IconButton
                  aria-label="Delete task"
                  icon={<FaTrash />}
                  onClick={() => deleteTask(task.id)}
                  colorScheme="red"
                  size="sm"
                />
              </div>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;