import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'src/components/buttons'
import { increment, decrement } from 'src/slices/count'

const Wrapper = styled.div`
  padding: 1rem;
`;

const Container = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-right: .5rem;
  }
`

const Home = () => {
  const countState = useSelector(state => state.countState)
  const dispatch = useDispatch()

  return (
    <Wrapper>
      <Container>
        <Button
          label='decrement'
          color='brand'
          onClick={() => dispatch(decrement())}
        />
        <p>{countState.count}</p>
        <Button
          label='increment'
          color='brand'
          onClick={() => dispatch(increment())}
        />
      </Container>
    </Wrapper>
  )
}

export default Home
