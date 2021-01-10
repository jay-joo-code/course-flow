import React, { useState } from 'react'

import { useCreateListing } from 'src/api/listing'
import theme from 'src/app/theme'
import { Button } from 'src/components/buttons'
import { Input } from 'src/components/formElements'
import Icon from 'src/components/icon'
import { FlexColumn, FlexRow, Space } from 'src/components/layout'
import DesktopContainer from 'src/components/layout/DesktopContainer'
import OutsideClickListener from 'src/components/layout/OutsideClickListener'
import Text from 'src/components/text'
import Span from 'src/components/text/Span'
import useMergeState from 'src/hooks/useMergeState'
import useRouter from 'src/hooks/useRouter'
import styled from 'styled-components'
import AddressInput from './AdressInput'
import { ListingDoc } from 'src/types'

interface NewProps {

}

const Container = styled.div`
  padding: 1rem;
`

const BorderedCard = styled.div`
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  padding: 1rem;
  max-width: 500px;
  cursor: pointer;

  // isSelected
  border-color: ${props => props.isSelected && props.theme.brand};
`

const New = ({ }: NewProps) => {
  // TODO: has previous listing handing

  const [selected, setSelected] = useState<'new' | string>()
  const [data, setData] = useMergeState({
    address: '',
    milesToCampus: null,
    lat: null,
    lng: null
  })
  const { address, milesToCampus } = data

  const readyToStart = selected === 'new'
    ? address && milesToCampus
    : false

  const router = useRouter()
  const { createListing } = useCreateListing()
  const handleStart = async () => {
    // TODO: handle not signed in

    const listing: (ListingDoc | undefined) = await createListing(data)
    router.push(`/edit/${listing?._id}`)
  }

  return (
    <DesktopContainer>
      <Container>
        <Space margin='1rem 0' />
        <FlexColumn ac>
          <BorderedCard
            isSelected={selected === 'new'}
            onClick={() => setSelected('new')}
          >
            <Text variant='h4'>Create a new listing</Text>
            <Space margin='.5rem 0' />
            <Text variant='h5'>Create a new sublet listing to reach thousands within the Cornell community.</Text>
            {selected === 'new' && (
              <>
                <Space margin='2rem 0' />
                <AddressInput
                  data={data}
                  setData={setData}
                />
                {/* <Space margin='1rem 0' />
                <FlexRow ac>
                  <Icon variant='lock' size='1.5rem' fill={theme.textLight} />
                  <Space margin='0 .3rem' />
                  <Text variant='h5' color={theme.textLight}>Your address will <Span fontWeight={500}>not</Span> be shown to the public.</Text>
                </FlexRow> */}
              </>
            )}
          </BorderedCard>
          <Space margin='1.5rem 0' />
          {readyToStart
            ? (
            <FlexRow jc>
              <Button
                label='Get started!'
                onClick={handleStart}
              />
            </FlexRow>
              )
            : <div />}
        </FlexColumn>
      </Container>
    </DesktopContainer>
  )
}

export default New
