import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useRouter from 'src/hooks/useRouter'
import { logout } from 'src/slices/auth'

const LogOut = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(logout())
    router.push('/')
  }, [])

  return null
}

export default LogOut
