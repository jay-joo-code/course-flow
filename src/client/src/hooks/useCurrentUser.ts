import React, { useState } from 'react'
import useCustomQuery from './useCustomQuery'

const useCurrentUser = () => {
  const { data } = useCustomQuery({
    url: '/private/user/current',
  })
  return data
}

export default useCurrentUser
