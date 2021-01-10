import React, { useEffect } from 'react'
import { useListingById } from 'src/api/listing'
import theme from 'src/app/theme'
import Icon from 'src/components/icon'
import { FlexRow, Space } from 'src/components/layout'
import DesktopContainer from 'src/components/layout/DesktopContainer'
import Text from 'src/components/text'
import useRouter from 'src/hooks/useRouter'
import styled from 'styled-components'
import { toShortAddress } from 'src/util/formatText'

import EditForm from './EditForm'
import { Button } from 'src/components/buttons'
import { Link } from 'react-router-dom'

interface EditProps {

}

const Container = styled.div`
  padding: 1rem;
`

const Edit = ({ }: EditProps) => {
  const router = useRouter()
  const lid = router.pathname.split('/')[2]
  const { listing } = useListingById(lid)

  if (!listing) return null

  const {
    address
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
            fill={theme.text} />
          <Space margin='0 .5rem' />
          <Text
            variant='h3'
            fontWeight={500}>{toShortAddress(address)}</Text>
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
