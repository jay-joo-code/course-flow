import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { queryCache } from 'src/app/App'
import useRouter from 'src/hooks/useRouter'
import { logout } from 'src/slices/auth'

const LogOut = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(logout())
    queryCache.clear()
    router.push('/')
  }, [dispatch, router])

  return null
}

export default LogOut
