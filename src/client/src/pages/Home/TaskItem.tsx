import React from 'react'
import Icon from 'src/components/icon';
import { FlexRow, Space } from 'src/components/layout';
import Text from 'src/components/text';
import useCustomMutation from 'src/hooks/useCustomMutation';
import { taskList } from 'src/queries';
import { TaskDoc } from 'src/types';
import styled from 'styled-components'

interface TaskItemProps {
  task: TaskDoc
}

const Container = styled(FlexRow)`
  padding: .2rem 0;
`;

const TaskItem = ({ task }: TaskItemProps) => {
  const { _id, complete, name } = task
  const { mutate: toggleComplete } = useCustomMutation({
    url: `/private/task/${_id}`,
    method: 'put',
    updateLocal: {
      queryConfig: taskList(),
      type: 'update',
    }
  })

  const handleToggleComplete = () => {
    toggleComplete({
      _id,
      complete: !complete
    })
  }

  const { mutate: deleteTask } = useCustomMutation({
    url: `/private/task/${_id}`,
    method: 'delete',
    updateLocal: {
      queryConfig: taskList(),
      type: 'delete',
    }
  })

  const handleDeleteTask = () => {
    deleteTask({
      _id,
    })
  }

  return (
    <Container ac onClick={handleToggleComplete}>
      <Text variant='p' color={complete ? 'success' : 'text'}>{name}</Text>
      <Space margin='0 1rem' />
      <Icon
        variant='delete'
        pointer
        interactiveHover
        onClick={handleDeleteTask}
      />
    </Container>
  )
}

export default TaskItem
