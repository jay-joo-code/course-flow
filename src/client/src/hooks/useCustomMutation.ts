import { useMutation, useQuery } from "react-query"
import api from "src/api"
import { queryCache } from "src/app/App"
import { IQueryConfig } from "./useCustomQuery"

interface IUpdateLocal {
  queryConfigs: IQueryConfig[]
  type: 'create' | 'update' | 'delete'
}

interface IMutationOptions {
  url: string
  method: 'post' | 'put' | 'delete'
  updateLocal?: IUpdateLocal
}

interface ISnapshot {
  queryKey: any
  previousValues: any
}

const useCustomMutation = <T>({ url, method, updateLocal }: IMutationOptions) => {
  const updateLocalConfig = updateLocal
  ? {
    // When mutate is called:
    onMutate: (newVariables) => {
      if (updateLocal) {
        const snapshots: ISnapshot[] = []

        console.log('updateLocal.queryConfigs', updateLocal.queryConfigs)

        updateLocal.queryConfigs.forEach((queryConfig) => {
          const { url: fetchUrl, variables: fetchVariables } = queryConfig
          const queryKey = [fetchUrl, fetchVariables]
          console.log('queryKey', queryKey)
          // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
          queryCache.cancelQueries(queryKey)

          // Snapshot the previous value
          const previousValues = queryCache.getQueryData(queryKey)

          // Optimistically update to the new value
          queryCache.setQueryData(queryKey, (old: any) => {
            console.log('old', old)
            // create
            if (updateLocal.type === 'create') {
              if (old) return [...old, newVariables]
              return [newVariables]
            }

            // update
            if (updateLocal.type === 'update') {
              // update by id
              if (newVariables._id) {
                const newValues = old?.map((value) => {
                  if (value._id === newVariables._id) {
                    return { ...value, ...newVariables }
                  }
                  return value
                })
                return newValues
              } else {
                // if newVariables._id not defined, dont update locally
                if (old) return [...old]
                return undefined
              }
            }

            // delete
            if (updateLocal.type === 'delete') {
              // delete by id
              if (newVariables._id) {
                const newValues = old?.filter((value) => value._id !== newVariables._id)
                return newValues
              } else {
                // if newVariables._id not defined, dont delete locally
                if (old) return [...old]
                return undefined
              }
            }

            if (old) return [...old]
            return undefined
          })

          snapshots.push({ queryKey, previousValues })
        })

        // Return the snapshotted values
        console.log('snapshots', snapshots)
        return () => {
          snapshots.forEach(({ queryKey, previousValues }) => {
            const values = queryCache.setQueryData(queryKey, previousValues)
            console.log('values', values)
          })
        }
      }
    },

    // If the mutation fails, use the value returned from onMutate to roll back
    onError: (err, newVariables, rollback: any) => {
      console.log('rollback', rollback)
      console.log('typeof rollback', typeof rollback)
      if (rollback) {
        const rollbackData = rollback()
        console.log('rollbackData', rollbackData)
        return rollbackData
      }
    },

    // Always refetch after error or success:
    onSettled: () => {
      if (updateLocal) {
        updateLocal.queryConfigs.forEach(({ url, variables }) => {
          const queryKey = [url, variables]
          queryCache.invalidateQueries(queryKey)
        })
      }
    }
  }
  : {}

  const [mutate, mutationInfo] = useMutation<T, any, any>((variables: any) => new Promise(async(resolve, reject) => {
      try {
        const data = await api(method, url, variables) as T
        resolve(data)
      } catch (error) {
        reject(error)
      }
    }),
    { ...updateLocalConfig })
  return { mutate, ...mutationInfo }
}

export default useCustomMutation
