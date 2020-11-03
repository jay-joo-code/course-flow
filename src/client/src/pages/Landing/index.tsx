import React from 'react'
import { H3, H4, P } from 'src/components/globals';
import { Margin } from 'src/components/layout'
import styled from 'styled-components'
import { ReactComponent as FactorySVG } from 'src/assets/illustrations/factory.svg'
import { ReactComponent as WavesSmSVG } from 'src/assets/illustrations/waves-sm.svg'

const Section = styled.div`
  position: relative;
  min-height: 80vh;

  // gradient
  background: ${props => props.gradient && 'radial-gradient(1404.41px at 142.99% -142.62%,#4b0491 0,#e52451 100%)'};
`;

const ContentPadding = styled.div`
  padding: .5rem 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Logo = styled(H4)`
  color: white;
`;

const ConditionalRow = styled.div`
  @media (min-width: )
`;

const BannerText = styled.div`
  & * {
    color: white;
    text-align: center;
  }
`;

const FactoryIllustContainer = styled.div`
  max-width: 100%;
  overflow: hidden;
`;

const FactoryIllust = styled(FactorySVG)`
  width: 30rem;
`;

const WavesSmIllust = styled(WavesSmSVG)`
  position: absolute;
  /* width: 100vw; */
  bottom: -2px;
  left: -5px;
  right: -5px;
`;

const Landing = () => {
  return (
    <>
      <Section gradient>
        <ContentPadding>
          <Header>
            <Logo>Jay's Design</Logo>
          </Header>
          <Margin margin='5rem 0' />
          <BannerText>
            <H3>Logical Design</H3>
            <Margin margin='1rem 0' />
            <H4>Design that is not only aesthetically pleasing, but also improves the user experience.</H4>
          </BannerText>
        </ContentPadding>
        <FactoryIllustContainer>
          <FactoryIllust data-aos='fade-up' />
        </FactoryIllustContainer>
        <WavesSmIllust />
      </Section>
      <Section>

      </Section>
    </>
  )
}

export default Landing
