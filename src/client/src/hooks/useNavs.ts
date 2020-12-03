import React from 'react'
import { routes } from 'src/app/Routes'
import useCurrentUser from './useCurrentUser'

const useNavs = () => {
  const currentUser = useCurrentUser()
  const publicNavs = routes.filter((route) => route.isPublicNav)
  const privateNavs = routes.filter((route) => route.isPrivateNav)

  if (currentUser) return privateNavs

  return publicNavs
}

export default useNavs
