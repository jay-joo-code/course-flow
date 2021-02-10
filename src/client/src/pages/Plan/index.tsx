import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { usePlanById } from 'src/api/plan'
import useRouter from 'src/hooks/useRouter'
import { setPsid } from 'src/slices/plan'
import styled from 'styled-components'
import SemesterList from './SemesterList'

const Container = styled.div`
  display: flex;
  overflow: hidden;
`

const Plan = () => {
  const { match }: { match: any } = useRouter()
  const { plan } = usePlanById(match.params?.psid)

  // save psid to redux to persist it
  const dispatch = useDispatch()
  useEffect(() => {
    if (match.params?.psid) {
      dispatch(setPsid({ psid: match.params?.psid }))
    }
  }, [])

  return (
    <Container>
      {plan?.semesters && <SemesterList semesters={plan?.semesters} />}
    </Container>
  )
}

export default Plan
