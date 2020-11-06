import React, { useEffect, useState } from 'react'
import { QueryResult } from 'react-query';
import { Checkbox } from 'src/components/formElements';
import { Label, P } from 'src/components/globals';
import useCustomQuery from 'src/hooks/useCustomQuery';
import useMergeState from 'src/hooks/useMergeState';
import { ITask } from 'src/types';
import styled from 'styled-components'
import CreateTask from './CreateTask';
import TaskFilter from './TaskFilter';
import TaskList from './TaskList';

const Container = styled.div`
  padding: 0 1rem;
`

const TodoList = () => {
  const [queryConfig, setQueryConfig] = useMergeState({
    url: '/task',
    variables: {},
  })

  return (
    <Container>
      <CreateTask
        queryConfig={queryConfig}
      />
      <TaskFilter
        setQueryConfig={setQueryConfig}
        queryConfig={queryConfig}
      />
      <TaskList
        queryConfig={queryConfig}
      />
    </Container>
  )
}

export default TodoList
