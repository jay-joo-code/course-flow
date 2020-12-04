import React from 'react'
import useCurrentUser from 'src/hooks/useCurrentUser';
import useCustomQuery from 'src/hooks/useCustomQuery';
import { taskList } from 'src/queries';
import styled from 'styled-components'
import CreateTask from './CreateTask';
import TaskList from './TaskList';

const Container = styled.div`
  padding: 1rem;
`;

const Home = () => {
  const user = useCurrentUser()
  const { data: tasks } = useCustomQuery(taskList())

  return (
    <Container>
      <CreateTask />
      <TaskList tasks={tasks} />
    </Container>
  )
}

export default Home
