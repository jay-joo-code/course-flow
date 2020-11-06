import React from 'react'
import { Input } from 'src/components/formElements'
import debounce from 'debounce'

const TaskFilter = ({ queryConfig, setQueryConfig }) => {
  const handleChange = (e) => {
    setQueryConfig({ variables: { name: e.target.value }})
  }
  return (
    <div>
      <Input
        label='filter'
        value={queryConfig.variables.name}
        onChange={handleChange}
        width={200}
      />
    </div>
  )
}

export default TaskFilter
