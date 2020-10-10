import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'src/components/buttons'
import { increment, decrement } from 'src/slices/count'
import useApi from 'src/hooks/useApi'

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
  const [{ isLoading }, createNote] = useApi.post('/note');
  
  const handleCreateNote = () => {

  }

  return (
    <div>
      <Container>
        <Button
          label='decrement'
          color='primary'
          onClick={() => dispatch(decrement())}
        />
        <p>{countState.count}</p>
        <Button
          label='increment'
          color='primary'
          onClick={() => dispatch(increment())}
        />
      </Container>

      <Button
        label='Create note'
        color='primary'
        onClick={handleCreateNote}
      />
    </div>
  )
}

export default Home
