import React from 'react'
import { useMajors } from 'src/api/major'
import { useGeneratePlanByMajor } from 'src/api/plan'
import theme from 'src/app/theme'
import { ReactComponent as EngineeringIconRaw } from 'src/assets/svgs/departments/engineering.svg'
import { FlexRow, Space } from 'src/components/layout'
import Pill from 'src/components/pill'
import Text from 'src/components/text'
import useRouter from 'src/hooks/useRouter'
import styled from 'styled-components'

interface MajorSelectorProps {

}

const Container = styled.div`
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 8px;
  display: flex;
`

const DepartmentList = styled.div`
  border-right: 1px solid ${(props) => props.theme.border};

  & > div {
    border-bottom: 1px solid ${(props) => props.theme.border};
  }
`

const DepartmentListItem = styled(FlexRow)`
  padding: .5rem 1rem;
  align-items: center;
  border-right: 3px solid ${(props) => props.theme.brand};
`

const EngineeringIcon = styled(EngineeringIconRaw)`
  fill: ${(props) => props.theme.text};
`

const MajorList = styled.div`
  flex: 1;
  max-height: 300px;
  overflow: auto;

  & > div {
    border-top: 1px solid ${(props) => props.theme.border};
  }

  & > div::first-child {
    border-top: none;
  }
`

const MajorListItem = styled(FlexRow)`
  padding: .5rem 1rem;
  align-items: center;
  
  // isComingSoon
  cursor: ${(props) => !props.isComingSoon && 'pointer'};
  background: ${(props) => props.isComingSoon && props.theme.grey[50]};
  
  &:hover {
    background: ${(props) => !props.isComingSoon && props.theme.brandBg};
  }
`

const TextContainer = styled.div`
  width: 200px;
  white-space: initial;
`

const MajorSelector = ({ }: MajorSelectorProps) => {
  const { majors } = useMajors()
  const router = useRouter()
  const { generatePlan } = useGeneratePlanByMajor()

  const handleClickMajor = async (majorId) => {
    const newPsid = await generatePlan({ majorId })
    router.push(`/plan/${newPsid}`)
  }

  return (
    <Container>
          <DepartmentList>
            <DepartmentListItem>
              <EngineeringIcon />
              <Space margin='0 .2rem' />
              <Text
                variant='h5'
                fontWeight={500}
              >Engineering</Text>
            </DepartmentListItem>
          </DepartmentList>
          <MajorList>
            {majors?.map((major) => (
              <MajorListItem
                key={major._id}
                isComingSoon={major.isComingSoon}
                onClick={() => handleClickMajor(major._id)}
              >
                <TextContainer>
                  <Text
                    variant='h5'
                    color={major.isComingSoon ? theme.textMuted : theme.text}
                  >{major.name}</Text>
                </TextContainer>
                {major.isComingSoon && <Pill label='Coming soon' />}
              </MajorListItem>
            ))}
          </MajorList>
        </Container>
  )
}

export default MajorSelector
