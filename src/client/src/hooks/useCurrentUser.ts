import { useSelector } from 'react-redux'
import { RootState } from 'src/types/redux'
import { IUserDoc } from 'src/types/user'
import useCustomQuery from './useCustomQuery'

const useCurrentUser = () => {
  const { data } = useCustomQuery<IUserDoc>({
    url: '/private/user/current',
  })

  const { accessToken } = useSelector((state: RootState) => state.authState)
  if (!accessToken) return null

  return data
}

export default useCurrentUser
