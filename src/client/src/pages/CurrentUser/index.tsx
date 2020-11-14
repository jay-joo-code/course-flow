import React from 'react'
import useCurrentUser from 'src/hooks/useCurrentUser'
import { getAuthToken } from 'src/util/authToken'

const CurrentUser = () => {
  const user = useCurrentUser()

  if (!user) return null

  return (
    <div>
      <div>
        {JSON.stringify(user)}
      </div>
      <div>
        {getAuthToken()}
      </div>
    </div>
  )
}

export default CurrentUser
