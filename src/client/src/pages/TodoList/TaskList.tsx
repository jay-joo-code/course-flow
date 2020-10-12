import React from 'react'
import { Checkbox } from 'src/components/formElements';
import { Label } from 'src/components/globals';
import useApi from 'src/hooks/useApi';
import styled from 'styled-components'

const ListContainer = styled.div`
  width: 400px;
  padding: 1rem;
`;

const TaskContainer = styled.div`
  border-bottom: 1px solid ${props => props.theme.bg.border};
  padding: .5rem;
  display: flex;
  align-items: center;
`;

export interface TaskListProps {
  data: any[]
  fetchTasks: () => void
}

const TaskList = ({ data, fetchTasks }: TaskListProps) => {
  useApi.put('/task')
  const toggleComplete = (checked, id) => {
    console.log('checked, id :>> ', checked, id);
  }

  return (
    <ListContainer>
      {data?.map((task) => (
        <TaskContainer key={task._id}>
          <Checkbox
            checked={task.complete}
            onClick={() => { toggleComplete(!task.complete, task._id) }}
          >
            <Label>{task.name}</Label>
          </Checkbox>
        </TaskContainer>
      ))}
    </ListContainer>
  )
}

export default TaskList
