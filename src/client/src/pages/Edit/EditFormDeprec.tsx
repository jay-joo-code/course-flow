import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useUpdateListingById } from 'src/api/listing'
import { Button } from 'src/components/buttons'
import { FlexRow, Space } from 'src/components/layout'
import { ListingDoc } from 'src/types'
import { showToast } from 'src/util/toast'
import styled from 'styled-components'
import * as Yup from 'yup'
import DateInputGroup from './DateInputGroup'
import DescriptionInputGroup from './DescriptionInputGroup'
import PhotoInputGroup from './PhotoInputGroup'
import PropertyInputGroup from './PropertyInputGroup'
import RentInputGroup from './RentInputGroup'
import RoommateInputGroup from './RoommateInputGroup'
import UtilityInputGroup from './UtilityInputGroup'

const Form = styled.form`
  & > * {
    margin-bottom: 1rem;
  }

  @media (min-width: ${(props) => props.theme.medium}) {
    width: 400px;
  }
`

interface EditFormDeprecProps {
  listing: ListingDoc
}

const EditFormDeprec = ({ listing }: EditFormDeprecProps) => {
  const {
    _id,
    isComplete,
    isActive,
    userId,
    views,

    // property
    regionCode,
    propertyTypeCode,
    furnishingCode,
    bedroomsTotal,
    bedroomsAvailable,
    bathroomsTotal,

    // dates
    year,
    termCode,
    startDate,
    endDate,

    // rent
    rent,
    deposit,

    // utilities
    isUtilIncluded,
    separateUtils,
    utilCost,

    // roommates
    roommates,
    tenantGenderCode,

    // photos
    photos,

    // description
    description,
  } = listing

  const { updateListing } = useUpdateListingById(_id)

  const [isSavedOnMount, setIsSavedOnMount] = useState(false)

  const formik = useFormik({
    initialValues: {
      // property
      regionCode: regionCode || null,
      propertyTypeCode: propertyTypeCode || null,
      furnishingCode: furnishingCode || null,
      bedroomsTotal: bedroomsTotal || 1,
      bedroomsAvailable: bedroomsAvailable || 1,
      bathroomsTotal: bathroomsTotal || 1,

      // dates
      year: year || null,
      termCode: termCode?.toString() || null,
      startDate: startDate || null,
      endDate: endDate || null,

      // rent
      rent: rent || null,
      deposit: deposit || null,

      // utilities
      isUtilIncluded: isUtilIncluded,
      separateUtils: separateUtils || [],
      utilCost: utilCost || null,

      // roommates
      roommates: roommates || [],
      tenantGenderCode: tenantGenderCode || null,

      // photos
      photos: photos || [],

      // description
      description: description || '',
    },
    validationSchema: Yup.object({
      rent: Yup.number()
        .nullable()
        .typeError('Rent must be a number'),
      deposit: Yup.number()
        .nullable()
        .typeError('Deposit must be a number'),
      utilCost: Yup.number()
        .nullable()
        .typeError('Utility costs must be a number'),
    }),
    onSubmit: async (values) => {
      if (isSavedOnMount) {
        if (isComplete) {
          showToast('success', 'Your changes have been saved!', {
            toastId: 'submitted',
          })
        }
        await updateListing(values)
      } else {
        setIsSavedOnMount(true)
      }
    },
  })

  console.count('rerender')

  return (
    <Form onSubmit={formik.handleSubmit}>
      {/* <EmbedAutosave
        formik={formik}
        debounceMs={1000}
      /> */}
      {/* <PropertyInputGroup formik={formik} />
      <Space margin="3rem 0" />
      <DateInputGroup formik={formik} />
      <Space margin="3rem 0" />
      <RentInputGroup formik={formik} />
      <Space margin="3rem 0" />
      <UtilityInputGroup formik={formik} />
      <Space margin="3rem 0" />
      <RoommateInputGroup formik={formik} />
      <Space margin="3rem 0" />
      <PhotoInputGroup formik={formik} />
      <Space margin="3rem 0" />
      <DescriptionInputGroup formik={formik} />
      <Space margin="1rem 0" />
      <FlexRow je>
        <Button
          label={isComplete ? 'Save' : 'Publish'}
          type="submit"
        />
      </FlexRow> */}
    </Form>
  )
}

export default EditFormDeprec
