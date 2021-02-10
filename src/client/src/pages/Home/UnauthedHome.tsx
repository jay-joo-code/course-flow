import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import googleSignin from 'src/assets/services/google-signin@2x.png'
import theme from 'src/app/theme'
import { Link } from 'react-router-dom'
import { Select } from 'src/components/formElements'
import Text from 'src/components/text'
import { FlexColumn, FlexRow, Space } from 'src/components/layout'
import { useMajors } from 'src/api/major'
import Pill from 'src/components/pill'
import { ReactComponent as EngineeringIconRaw } from 'src/assets/svgs/departments/engineering.svg'

import { useTemplateByMajorId } from 'src/api/template'
import { useGeneratePlanByMajor } from 'src/api/plan'
import history from 'src/util/history'
import { useDispatch, useSelector } from 'react-redux'
import { setPsid } from 'src/slices/plan'
import { RootState } from 'src/types/redux'

const HoriBar = styled.div`
  width: 70%;
  border-bottom: 1px solid ${(props) => props.theme.border};
`

const SelectMajorSection = styled.div`
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

const UnauthedHome = () => {
  const { majors } = useMajors()
  const { generatePlan } = useGeneratePlanByMajor()

  const handleClickMajor = async (majorId) => {
    const newPsid = await generatePlan({ majorId })
    history.push(`/plan/${newPsid}`)
  }

  // load pre-existing plan with persisted psid
  const { psid } = useSelector((state: RootState) => state.planState)
  useEffect(() => {
    if (psid) {
      history.push(`/plan/${psid}`)
    }
  }, [])

  return (
    <FlexColumn
      ac
      jc
    >
      <Text variant='h3'>Welcome back!</Text>
        <Space margin='.2rem 0' />
        <Text
          variant='p'
          color={theme.textMuted}
        >Sign in to load your course plan</Text>
        <Space margin='1rem 0' />
        <Link to='/login'>
          <img srcSet={`${googleSignin} 2x`} />
        </Link>
        <Space margin='1rem 0' />
        <HoriBar />
        <Space margin='1rem 0' />
        <Text variant='h3'>Or is it your first time here?</Text>
        <Space margin='.2rem 0' />
        <Text
          variant='p'
          color={theme.textMuted}
        >Choose your major to get started!</Text>
        <Space margin='1rem 0' />
        <SelectMajorSection>
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
        </SelectMajorSection>
    </FlexColumn>
  )
}

export default UnauthedHome
