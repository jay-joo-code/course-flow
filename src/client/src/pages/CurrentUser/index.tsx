import React from 'react'
import useCurrentUser from 'src/hooks/useCurrentUser'

const CurrentUser = () => {
  const user = useCurrentUser()

  if (!user) return null

  return (
    <div>{user.email}</div>
  )
}

export default CurrentUser
