import React, { useEffect, useState } from 'react'
import { Checkbox } from 'src/components/formElements';
import { Label, P } from 'src/components/globals';
import useApi from 'src/hooks/useApi';
import styled from 'styled-components'
import CreateTask from './CreateTask';
import TaskList from './TaskList';

const Container = styled.div`

`

const TodoList = () => {
  const [{ data, error, setLocalData }, fetchTasks] = useApi.get('/task');
  const [globalChcked, setGlobalChcked] = useState(false)

  return (
    <Container>
      <CreateTask
        fetchTasks={fetchTasks}
      />
      <TaskList
        data={data}
        fetchTasks={fetchTasks}
      />
    </Container>
  )
}

export default TodoList
