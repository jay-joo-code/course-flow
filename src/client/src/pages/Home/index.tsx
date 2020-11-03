import React, { useState } from 'react'
import theme from 'src/app/theme';
import { Button } from 'src/components/buttons';
import { Checkbox, Input, Select, TextArea } from 'src/components/formElements';
import { H1, H2, H3, H4, H5, H6, P } from 'src/components/globals';
import Icon from 'src/components/icon';
import { FlexColumn, Margin } from 'src/components/layout';
import Loading from 'src/components/loading';
import Modal from 'src/components/modal';
import { showToast } from 'src/util/toast';
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem .5rem;
  min-height: 90vh;

  @media (min-width: ${props => props.theme.mobileL}) {
    flex-direction: row;
  }

  & > div {
    margin-right: 2rem;

    & > * {
      margin-bottom: .2rem;
    }
  }
`;

const TestBox = styled.div`
  background: ${props => props.color && props.theme[props.color]};
  height: 40px;
  width: 100px;
  margin-bottom: .2rem;
`;

const BorderBox = styled.div`
  border: 2px solid ${props => props.border && props.theme[props.border]};
  border-radius: 8px;
  height: 40px;
  width: 100px;
  margin-bottom: .2rem;
`;

const Home = () => {

  const colors = Object.entries(theme)
    .filter(([key, value]) => typeof value === 'string' && !key.includes('border') && !key.includes('text'))
    .map(([key, value]) => key)

  const [isOpen, setIsOpen] = useState(false);

  const testOptions = [
    {
      label: 'A',
      value: 'a',
    },
    {
      label: 'B',
      value: 'b',
    },
    {
      label: 'C',
      value: 'c',
    },
  ]

  return (
    <>
      <Wrapper>
        <div>
          <H1>Test Text</H1>
          <H2>Test Text</H2>
          <H3>Test Text</H3>
          <H4>Test Text</H4>
          <H5>Test Text</H5>
          <H6>Test Text</H6>
          <P>Test Text</P>
        </div>
        <div>
          {colors.map((color) => (
            <TestBox key={color} color={color} />
          ))}
        </div>
        <div>
          <BorderBox border='border' />
          <BorderBox border='borderLight' />
          <BorderBox border='borderDark' />
        </div>
        <div>
          <H1 color='text'>Test Text 123</H1>
          <H1 color='textLight'>Test Text 123</H1>
          <H1 color='textMuted'>Test Text 123</H1>
          <H1 color='textPlaceholder'>Test Text 123</H1>
        </div>
        <Loading />
        <FlexColumn>
          <Button
            label='test button'
          />
          <Button
            label='test button'
            isLoading
          />
          <Button
            label='test button'
            icon='article'
          />
          <Button
            label='test button'
            bordered
            icon='article'
          />
          <Button
            label='toast button'
            text
            icon='article'
          />
        </FlexColumn>
        <FlexColumn>
          <Icon
            variant='article'
            fill='brand'
            size='3rem'
          />
        </FlexColumn>
        <FlexColumn>
          <Button
            label='show toast'
            onClick={() => showToast('success', 'toasts are here!')}
          />
          <Button
            label='open modal'
            onClick={() => setIsOpen(true)}
          />
          <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            heading='Test Modal'
          >
            <P>This is some test content</P>
            <P color='textMuted'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis consequatur earum corporis possimus molestiae, fugiat quae obcaecati dolore cumque nemo.</P>
          </Modal>
        </FlexColumn>
      </Wrapper>
      <Wrapper>
        <FlexColumn>
          <Input
            label='test input'
            width={200}
          />
          <Input
            label='disabled input'
            width={200}
            disabled
          />
          <Checkbox
            label='test checkbox'
          />
          <TextArea
            label='test textarea'
            minRows={4}
          />
          <Select
            label='test select'
            options={testOptions}
          />
        </FlexColumn>
      </Wrapper>
    </>
  )
}

export default Home
