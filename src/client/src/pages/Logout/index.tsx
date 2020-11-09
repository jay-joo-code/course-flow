import React, { useEffect } from 'react'
import useRouter from 'src/hooks/useRouter'
import { resetToken } from 'src/slices/token'
import { useDispatch } from 'react-redux'
import { resetAuthToken } from 'src/util/authToken'

const LogOut = () => {
  const router = useRouter()

  useEffect(() => {
    resetAuthToken()
    router.push('/')
  }, [])
  
  return null
}

export default LogOut
