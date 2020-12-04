import useCustomMutation from "src/hooks/useCustomMutation"
import useCustomQuery from "src/hooks/useCustomQuery"

export const fetchTasksConfig = () => ({
  url: `/private/task/user`
})

export const useTasks = () => {
  const { data: tasks, ...rest } = useCustomQuery(fetchTasksConfig())
  return {
    ...rest,
    tasks,
  }
}

export const useCreateTask = () => {
  const { mutate: createTask, ...rest } = useCustomMutation({
    url: `/private/task`,
    method: 'post',
    updateLocal: {
      queryConfig: fetchTasksConfig(),
      type: 'create',
    }
  })
  return {
    ...rest,
    createTask,
  }
}

export const useUpdateTask = (_id: string) => {
  const { mutate: updateTask, ...rest } = useCustomMutation({
    url: `/private/task/${_id}`,
    method: 'put',
    updateLocal: {
      queryConfig: fetchTasksConfig(),
      type: 'update',
    }
  })
  return {
    ...rest,
    updateTask,
  }
}

export const useDeleteTask = (_id: string) => {
  const { mutate: deleteTask, ...rest } = useCustomMutation({
    url: `/private/task/${_id}`,
    method: 'delete',
    updateLocal: {
      queryConfig: fetchTasksConfig(),
      type: 'delete',
    }
  })
  return {
    ...rest,
    deleteTask,
  }
}
