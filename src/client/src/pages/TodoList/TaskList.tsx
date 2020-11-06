import React from 'react'
import { Checkbox } from 'src/components/formElements';
import { Label } from 'src/components/globals';
import Icon from 'src/components/icon';
import useCustomMutation from 'src/hooks/useCustomMutation';
import useCustomQuery, { IQueryConfig } from 'src/hooks/useCustomQuery';
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
  justify-content: space-between;
`;

export interface TaskListProps {
  // data: ITask[] | undefined
  queryConfig: IQueryConfig
}

const TaskList = ({ queryConfig }: TaskListProps) => {
  const { data } = useCustomQuery<ITask[]>(queryConfig)
  return (
    <ListContainer>
      {data?.map((task) => (
        <TaskElt
          key={task._id}
          task={task}
          queryConfig={queryConfig}
        />
      ))}
    </ListContainer>
  )
}

interface TaskEltProps {
  task: ITask
  queryConfig: IQueryConfig
  // fetchTasks: () => void
  // toggleLocalTask: (id: string, complete: boolean) => void
}

const TaskElt = ({ task, queryConfig }: TaskEltProps) => {
  const { mutate: toggleTask } = useCustomMutation({
    url: `/task/${task._id}`,
    method: 'put',
    updateLocal: {
      type: 'update',
      queryConfig
    }
  })
  const handleChange = async (e) => {
    toggleTask({ ...task, complete: e.target.checked })
  }
  const { mutate: deleteTask } = useCustomMutation({
    url: `/task/${task._id}`,
    method: 'delete',
    updateLocal: {
      type: 'delete',
      queryConfig,
    }
  })
  const handleDelete = async () => {
    await deleteTask({ _id: task._id })
  }

  return (
    <TaskContainer key={task._id}>
      <Checkbox
        checked={task.complete}
        onChange={handleChange}
        label={task.name}
      />
      <Icon
        variant='delete'
        onClick={handleDelete}
        pointer
      />
    </TaskContainer>
  )
}

export default TaskList
