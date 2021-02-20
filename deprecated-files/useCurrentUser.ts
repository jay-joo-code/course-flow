import { useSelector } from 'react-redux'
import { RootState } from 'src/types/redux'
import { IUserDoc } from 'src/types/user'
import useCustomQuery from './useCustomQuery'

const useCurrentUser = () => {
  const { accessToken } = useSelector((state: RootState) => state.authState)
  const { data: user, ...rest } = useCustomQuery<IUserDoc>({
    url: '/private/user/current',
  })

  if (!accessToken) return null

  return { ...rest, user }
}

export default useCurrentUser
