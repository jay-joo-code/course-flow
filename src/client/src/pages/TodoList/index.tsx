import React, { useEffect, useState } from 'react'
import { Checkbox } from 'src/components/formElements';
import { Label, P } from 'src/components/globals';
import useApi from 'src/hooks/useApi';
import { ITask } from 'src/types';
import styled from 'styled-components'
import CreateTask from './CreateTask';
import TaskList from './TaskList';

const Container = styled.div`

`

const TodoList = () => {
  const [{ data, error, setLocalData }, fetchTasks] = useApi.get('/task');
  const toggleLocalTask = (id: string, complete: boolean) => {
    setLocalData((currentData) => {
      const newData = currentData.map((task: ITask) => {
        if (task._id === id) {
          return {
            ...task,
            complete,
          }
        }
        return task
      })
      return newData
    })
  }

  return (
    <Container>
      <CreateTask
        fetchTasks={fetchTasks}
      />
      <TaskList
        data={data}
        fetchTasks={fetchTasks}
        toggleLocalTask={toggleLocalTask}
      />
    </Container>
  )
}

export default TodoList
