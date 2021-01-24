import React from 'react'
import { Link } from 'react-router-dom'
import { useListingById } from 'src/api/listing'
import theme from 'src/app/theme'
import { Button } from 'src/components/buttons'
import Icon from 'src/components/icon'
import { FlexRow, Space } from 'src/components/layout'
import DesktopContainer from 'src/components/layout/DesktopContainer'
import Text from 'src/components/text'
import useRouter from 'src/hooks/useRouter'
import { toShortAddress } from 'src/util/formatText'
import styled from 'styled-components'
import EditForm from './EditForm'

const Container = styled.div`
  padding: 1rem;
`

const Edit = () => {
  const router = useRouter()
  const lid = router.pathname.split('/')[2]
  const { listing } = useListingById(lid)

  if (!listing) return null

  const {
    address,
  } = listing

  return (
    <DesktopContainer>
      <Container>
        <Space margin='.5rem 0' />
        <Link to='/profile/listings'>
          <Button
            label='My listings'
            icon='left'
            color={theme.brand}
            text
          />
        </Link>
        <Space margin='2rem 0' />
        <FlexRow ac>
          <Icon
            variant='place'
            fill={theme.text}
          />
          <Space margin='0 .5rem' />
          <Text
            variant='h3'
            fontWeight={500}
          >{toShortAddress(address)}</Text>
        </FlexRow>
        <Space margin='3rem 0' />
        <EditForm
          listing={listing}
        />
      </Container>
    </DesktopContainer>
  )
}

export default Edit
