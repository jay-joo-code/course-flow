import React from 'react'
import { Checkbox } from 'src/components/formElements';
import { Label } from 'src/components/globals';
import useApi from 'src/hooks/useApi';
import { ITask } from 'src/types';
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
  data: ITask[]
  fetchTasks: () => void
  toggleLocalTask: (id: string, complete: boolean) => void
}

const TaskList = ({ data, fetchTasks, toggleLocalTask }: TaskListProps) => {
  return (
    <ListContainer>
      {data?.map((task) => (
        <TaskElt
          key={task._id}
          task={task}
          fetchTasks={fetchTasks}
          toggleLocalTask={toggleLocalTask}
        />
      ))}
    </ListContainer>
  )
}

interface TaskEltProps {
  task: ITask
  fetchTasks: () => void
  toggleLocalTask: (id: string, complete: boolean) => void
}

const TaskElt = ({ task, fetchTasks, toggleLocalTask }: TaskEltProps) => {
  const [{}, updateTask] = useApi.put(`/task/${task._id}`)
  const handleChange = async (e) => {
    toggleLocalTask(task._id, e.target.checked)
    await updateTask({ complete: e.target.checked })
    await fetchTasks()
  }

  return (
    <TaskContainer key={task._id}>
      <Checkbox
        checked={task.complete}
        onChange={handleChange}
        label={task.name}
      />
    </TaskContainer>
  )
}

export default TaskList
