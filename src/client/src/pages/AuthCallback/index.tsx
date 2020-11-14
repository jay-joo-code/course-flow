import React, { useEffect } from 'react'
import useRouter from 'src/hooks/useRouter'
import { setAuthToken } from 'src/util/authToken'

const AuthCallback = () => {
  const router = useRouter()
  const { token } = router.query

  useEffect(() => {
    if (token) {
      setAuthToken(token)
    }
    router.push('/')
  }, [token])

  return null
}

export default AuthCallback
