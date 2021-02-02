import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import googleSignin from 'src/assets/services/google-signin@2x.png'
import useCurrentUser from 'src/hooks/useCurrentUser'
import { RootState } from 'src/types/redux'
import Avatar from '../avatar'

const Auth = () => {
  const { accessToken } = useSelector((state: RootState) => state.authState)
  const currentUser = useCurrentUser()
  const userPhotoSrc = currentUser?.providerData?.photos[0]?.value

  if (accessToken && userPhotoSrc) {
    return <Avatar src={userPhotoSrc} />
  }

  return (
    <Link to='/login'>
      <img srcSet={`${googleSignin} 2x`} />
    </Link>
  )
}

export default Auth
