import React from 'react'
import Icon from 'src/components/icon';
import { FlexRow, Space } from 'src/components/layout';
import Text from 'src/components/text';
import useCustomMutation from 'src/hooks/useCustomMutation';
import { fetchTasksConfig, useDeleteTask, useUpdateTask } from 'src/api/task';
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
  const { updateTask } = useUpdateTask(_id)
  const { deleteTask } = useDeleteTask(_id)

  const handleToggleComplete = () => {
    updateTask({
      _id,
      complete: !complete
    })
  }

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
