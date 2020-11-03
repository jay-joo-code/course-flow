import React from 'react'
import { toast } from 'react-toastify';
import theme from 'src/app/theme';
import { Button } from 'src/components/buttons';
import { H1, H2, H3, H4, H5, H6, Margin, P } from 'src/components/globals';
import Icon from 'src/components/icon';
import { Column } from 'src/components/layout';
import Loading from 'src/components/loading';
import { showToast } from 'src/util/toast';
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
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

  return (
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
      <Column>
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
      </Column>
      <Column>
        <Icon
          variant='article'
          fill='brand'
          size='3rem'
        />
      </Column>
      <Column>
        <Button
          label='show toast'
          onClick={() => showToast('success', 'toasts are here!')}
        />
      </Column>
    </Wrapper>
  )
}

export default Home
