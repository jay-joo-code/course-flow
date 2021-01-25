import { useQuery } from 'react-query'
import api from 'src/api'

export interface IQueryConfig {
  url: string
  variables?: any
}

const useCustomQuery = <T>({ url, variables }: IQueryConfig) => {
  return useQuery<T>({
    queryKey: [url, variables],
    queryFn: () => new Promise((resolve, reject) => {
      (async () => {
        try {
          const data = await api('get', url, variables) as T
          resolve(data)
        } catch (error) {
          reject(error)
        }
      })()
    }),
  })
}

export default useCustomQuery
