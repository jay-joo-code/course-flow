import React, { useEffect } from 'react'
import { Button } from 'src/components/buttons'
import useCustomMutation from 'src/hooks/useCustomMutation'
import useRouter from 'src/hooks/useRouter'
import { Space } from 'src/components/layout'

import { setAccessToken } from 'src/slices/auth'
import { useDispatch } from 'react-redux'

const Login = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const handleGoogleLogin = () => {
    if (process.env.NODE_ENV === 'development') {
      dispatch(setAccessToken(process.env.REACT_APP_TEST_ACCESS_TOKEN))
      router.push('/')
    } else {
      window.location.replace(`${process.env.REACT_APP_SERVER_DOMAIN}/api/public/auth/google`)
    }
  }

  handleGoogleLogin()

  return null
}

export default Login
