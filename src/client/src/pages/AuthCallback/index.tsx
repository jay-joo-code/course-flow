import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useRouter from 'src/hooks/useRouter'
import { setAccessToken } from 'src/slices/auth'
import { RootState } from 'src/types/redux'
import { usePlanById, useUpdatePlanById } from 'src/api/plan'
import useCurrentUser from 'src/hooks/useCurrentUser'
import { resetPsid } from 'src/slices/plan'

const AuthCallback = () => {
  const router = useRouter()
  const { token } = router.query
  const dispatch = useDispatch()
  const { psid } = useSelector((state: RootState) => state.planState)
  const { refetch: refetchPlan } = usePlanById(psid)
  const { updatePlan } = useUpdatePlanById(psid)
  const currentUser = useCurrentUser()

  // set access token
  useEffect(() => {
    (async () => {
      if (token) {
        dispatch(setAccessToken(token))
      } else {
        router.push('/')
      }
    })()
  }, [router, token])

  // if plan.userId is unset,
  // set it with current user id
  useEffect(() => {
    (async () => {
      if (currentUser && psid) {
        const { data: fetchedPlan } = await refetchPlan()

        if (!fetchedPlan?.userId) {
          // current plan is an unauthed plan
          await updatePlan({
            userId: currentUser._id,
          })
          dispatch(resetPsid())
          router.push(`/plan/${psid}`)
        } else {
          router.push('/')
        }
      } else {
        router.push('/')
      }
    })()
  }, [currentUser])

  return null
}

export default AuthCallback
