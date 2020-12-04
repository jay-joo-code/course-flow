import React from 'react'
import Text from 'src/components/text'
import TaskItem from './TaskItem'
import styled from 'styled-components'

const Container = styled.div`
  padding: 2rem 0;
`;

const TaskList = ({ tasks }) => {
  if (!tasks) return null

  return (
    <Container>
      {tasks.map((task) => (
        <TaskItem task={task} key={task._id} />
      ))}
    </Container>
  )
}

export default TaskList
