import React from 'react'
import { useTasks } from 'src/api/task';
import styled from 'styled-components'
import CreateTask from './CreateTask';
import TaskList from './TaskList';

const Container = styled.div`
  padding: 1rem;
`;

const Home = () => {
  const { tasks } = useTasks()

  return (
    <Container>
      <CreateTask />
      <TaskList tasks={tasks} />
    </Container>
  )
}

export default Home
