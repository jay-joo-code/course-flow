import React from 'react'
import LoginForm from './LoginForm'
import { Button } from 'src/components/buttons';
import useCustomMutation from 'src/hooks/useCustomMutation';
import useRouter from 'src/hooks/useRouter';

const Login = () => {
  const { mutate: googleLogin, isLoading } = useCustomMutation({
    method: 'post',
    url: '/public/auth/google'
  })
  const router = useRouter()
  const handleGoogleLogin = () => {
    window.location.replace('http://localhost:5000/api/public/auth/google')
  }

  return (
    <div>
      <LoginForm />
      <Button
        label='google login'
        onClick={handleGoogleLogin}
        isLoading={isLoading}
      />
    </div>
  )
}

export default Login
