import React, { useState } from 'react'

import theme from 'src/app/theme'
import { Button } from 'src/components/buttons'
import { Input, Select } from 'src/components/formElements'
import Icon from 'src/components/icon'
import InfoBox from 'src/components/infoBox'
import { FlexColumn, FlexRow, Space } from 'src/components/layout'
import Text from 'src/components/text'
import Span from 'src/components/text/Span'
import { IRoommate } from 'src/types'

interface RoommateInputGroupProps {
  formik: any;
}

const RoommateInputGroup = ({ formik }: RoommateInputGroupProps) => {
  const handleAddRoommate = () => {
    formik.setFieldValue('roommates', [...formik.values.roommates, { gender: null }])
  }

  const handleGenderChange = (newOption, idx: number) => {
    const newRoommates = formik.values.roommates.map((roommate, i: number) => {
      if (idx === i) {
        return { ...roommate, gender: newOption.value }
      }
      return roommate
    })
    formik.setFieldValue('roommates', newRoommates)
  }

  const handleGenderOtherChange = (e, idx: number) => {
    const newRoommates = formik.values.roommates.map((roommate, i: number) => {
      if (idx === i) {
        return { ...roommate, genderOther: e.target.value }
      }
      return roommate
    })
    formik.setFieldValue('roommates', newRoommates)
  }

  const handleDeleteRoommate = (i) => {
    const newRoommates = [...formik.values.roommates]
    newRoommates.splice(i, 1)
    formik.setFieldValue('roommates', newRoommates)
  }

  const genderOptions = [
    {
      label: 'Female',
      value: 'Female',
    },
    {
      label: 'Male',
      value: 'Male',
    },
    {
      label: 'Other',
      value: 'Other',
    },
  ]

  return (
    <FlexColumn alignStart>
      <Text variant="h3">Roommates</Text>
      <Space margin="1rem 0" />
      <InfoBox
        variant='warning'
      >
        <Text
          variant='p'
          color={theme.warning}
          fontWeight={700}
        >
          Roommates who are currently living in the property, but won’t be present in the duration of the sublet do <Span underline>not</Span> need to be included.
        </Text>
      </InfoBox>
      {formik.values.roommates.map(({ gender, genderOther }: IRoommate, i) => (
        <>
          <Space margin='1rem 0' />
          <FlexColumn
            key={Math.random()}
            fullWidth
          >
            <FlexRow
              ac
              jsb
              fullWidth
            >
              <Text
                variant='h4'
                fontWeight={700}
              >Roommate #{i + 1}</Text>
              <Icon
                variant='delete'
                size='2rem'
                interactiveHover
                onClick={() => handleDeleteRoommate(i)}
              />
            </FlexRow>
            <Select
              options={genderOptions}
              value={gender}
              onChange={(newOption) => handleGenderChange(newOption, i)}
            />
            {gender === 'Other' && (
              <>
                <Space margin='.5rem 0' />
                <Input
                  label='Gender (Other)'
                  value={genderOther}
                  onChange={(e) => handleGenderOtherChange(e, i)}
                />
              </>
            )}
          </FlexColumn>
        </>
      ))}
      <Space margin='1rem 0' />
      <Button
        label='Add a roommate'
        text
        onClick={handleAddRoommate}
      />
    </FlexColumn>
  )
}

export default RoommateInputGroup
