import React from 'react'
import { useSelector } from 'react-redux'
import { RootState, UserDoc } from 'src/types'
import useCustomQuery from './useCustomQuery'

const useCurrentUser = () => {
  const { data } = useCustomQuery<UserDoc>({
    url: '/private/user/current',
    config: {
      retry: 3,
    }
  })

  const { accessToken } = useSelector((state: RootState) => state.authState)
  if (!accessToken) return null

  return data
}

export default useCurrentUser
