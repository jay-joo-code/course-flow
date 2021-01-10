import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useRouter from 'src/hooks/useRouter'
import { setAccessToken } from 'src/slices/auth'

const AuthCallback = () => {
  const router = useRouter()
  const { token } = router.query
  const dispatch = useDispatch()

  useEffect(() => {
    if (token) {
      dispatch(setAccessToken(token))
    }
    router.push('/')
  }, [dispatch, router, token])

  return null
}

export default AuthCallback
