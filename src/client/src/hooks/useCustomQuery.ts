import { useQuery } from "react-query"
import api from "src/api"

export interface IConfig {
  retry?: number
}

export interface IQueryConfig {
  url: string
  variables?: any
  config?: IConfig
}

const useCustomQuery = <T>({ url, variables, config }: IQueryConfig) => {
  return useQuery<T>({
    queryKey: [url, variables],
    queryFn: () => new Promise(async (resolve, reject) => {
      // if (variables.isActive === undefined) variables.isActive = true

      try {
        const data = await api('get', url, variables) as T
        resolve(data)
      } catch (error) {
        reject(error)
      }
    }),
    config: {
      retry: false,
      ...config,
    }
  })
}

export default useCustomQuery
