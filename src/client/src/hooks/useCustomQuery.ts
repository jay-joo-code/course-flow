import { useQuery } from "react-query"
import api from "src/api"
import { objectToQueryString } from "src/util/url"

export interface IQueryConfig {
  url: string
  variables?: any
}

const useCustomQuery = <T>({ url, variables }: IQueryConfig) => {
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
    })
  })
}

export default useCustomQuery
