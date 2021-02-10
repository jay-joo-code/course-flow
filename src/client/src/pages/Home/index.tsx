import React from 'react'
import { FlexColumn, FlexRow, Space } from 'src/components/layout'
import Text from 'src/components/text'
import useIsMobile from 'src/hooks/useIsMobile'
import styled from 'styled-components'
import { ReactComponent as IllustHome } from 'src/assets/illustrations/illust-home.svg'
import useCurrentUser from 'src/hooks/useCurrentUser'
import UnauthedHome from './UnauthedHome'

const Container = styled(FlexRow)`

`

const Left = styled.div`
  flex: 1;
  background: ${(props) => props.theme.brandBg};
  display: flex;
  justify-content: center;
  align-items: center;
`

const Right = styled(FlexColumn)`
  flex: 1;

  & > div {
    height: 100%;
  }
`

const Illustration = styled(IllustHome)`
  width: 50%;
`

const Home = () => {
  const isMobile = useIsMobile()
  const currentUser = useCurrentUser()

  const getComponent = () => {
    if (!currentUser) return <UnauthedHome />
    else {

    }
  }

  if (isMobile) {
    return (

    <FlexColumn ac>
      <Space margin='.5rem 0' />
      <Text
        variant='p'
        style={{ textAlign: 'center' }}
      >CourseFlow is currently not avilable on mobile devices</Text>
    </FlexColumn>
    )
  }

  return (
    <Container>
      <Left>
        <Illustration />
      </Left>
      <Right>
        {getComponent()}
      </Right>
    </Container>
  )
}

export default Home
