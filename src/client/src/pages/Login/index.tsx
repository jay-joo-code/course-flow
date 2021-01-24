import { useDispatch } from 'react-redux'
import useRouter from 'src/hooks/useRouter'
import { setAccessToken } from 'src/slices/auth'

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
