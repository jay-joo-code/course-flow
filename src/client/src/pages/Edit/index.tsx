import React from 'react'
import { useListingById } from 'src/api/listing';
import theme from 'src/app/theme';
import Icon from 'src/components/icon';
import { FlexRow, Space } from 'src/components/layout';
import DesktopContainer from 'src/components/layout/DesktopContainer';
import Text from 'src/components/text';
import useRouter from 'src/hooks/useRouter';
import styled from 'styled-components'
import { toShortAddress } from 'src/util/formatText'
import { useEffect } from 'react';
import EditForm from './EditForm';

interface EditProps {
  
}

const Container = styled.div`
  padding: 1rem;
`;

const Edit = ({  }: EditProps) => {
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
        <Space margin='1rem 0' />
        <FlexRow ac>
          <Icon variant='place' fill={theme.text} />
          <Space margin='0 .5rem' />
          <Text variant='h3' fontWeight={500}>{toShortAddress(address)}</Text>
        </FlexRow>
        <EditForm />
      </Container>
    </DesktopContainer>
  )
}

export default Edit
