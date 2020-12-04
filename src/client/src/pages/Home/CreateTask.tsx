import React from 'react'
import { useState } from 'react'
import { Input } from 'src/components/formElements'
import useCustomMutation from 'src/hooks/useCustomMutation'
import { taskList } from 'src/queries'

const CreateTask = () => {
  const [name, setName] = useState('')
  const { mutate: createTask } = useCustomMutation({
    url: `/private/task`,
    method: 'post',
    updateLocal: {
      queryConfig: taskList(),
      type: 'create',
    }
  })
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
