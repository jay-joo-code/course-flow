import React from 'react'
import { useState } from 'react'
import { Input } from 'src/components/formElements'
import useCustomMutation from 'src/hooks/useCustomMutation'
import { fetchTasksConfig, useCreateTask } from 'src/api/task'

const CreateTask = () => {
  const [name, setName] = useState('')
  const { createTask } = useCreateTask()

  const handleCreateTask = () => {
    createTask({ name, })
    setName('')
  }

  return (
    <div>
      <Input
        label='Task'
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        onEnterPress={handleCreateTask}
      />
    </div>
  )
}

export default CreateTask
