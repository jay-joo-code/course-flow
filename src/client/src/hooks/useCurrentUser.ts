import React, { useState } from 'react'
import useCustomQuery from './useCustomQuery'

const useCurrentUser = () => {
  const { data } = useCustomQuery({
    url: '/auth/current',
  })
  return data
}

export default useCurrentUser
