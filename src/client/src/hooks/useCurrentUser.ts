import React, { useState } from 'react'
import { getAuthToken } from 'src/util/authToken'
import useCustomQuery from './useCustomQuery'

const useCurrentUser = () => {
  const { data } = useCustomQuery({
    url: '/private/user/current',
  })

  const token = getAuthToken()
  if (!token) return null

  return data
}

export default useCurrentUser
