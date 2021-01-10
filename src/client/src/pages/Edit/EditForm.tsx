import React, { useState } from 'react'
import { useFormik } from 'formik'
import styled from 'styled-components'
import * as Yup from 'yup'
import { Button } from 'src/components/buttons'
import {
  FormikCheckbox,
  FormikDatePicker,
  FormikInput,
  FormikRadioGroup,
  FormikSelect,
  FormikTextArea
} from 'src/components/formikElements'
import EmbedAutosave from 'src/components/formikElements/EmbedAutosave'
import { showToast } from 'src/util/toast'
import Text from 'src/components/text'
import PropertyInputGroup from './PropertyInputGroup'
import DateInputGroup from './DateInputGroup'
import { FlexRow, Space } from 'src/components/layout'
import { useUpdateListingById } from 'src/api/listing'
import { ListingDoc } from 'src/types'

import RentInputGroup from './RentInputGroup'
import UtilityInputGroup from './UtilityInputGroup'
import RoommateInputGroup from './RoommateInputGroup'
import PhotoInputGroup from './PhotoInputGroup'
import DescriptionInputGroup from './DescriptionInputGroup'

const Form = styled.form`
  & > * {
    margin-bottom: 1rem;
  }

  @media (min-width: ${(props) => props.theme.medium}) {
    width: 400px;
  }
`

interface EditFormProps {
  listing: ListingDoc
}

const EditForm = ({ listing }: EditFormProps) => {
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

    // description
    description
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
      startDate: startDate || new Date(),
      endDate: endDate || new Date(),

      // description
      description: description || ''
    },
    validationSchema: Yup.object({}),
    onSubmit: async (values) => {
      if (isSavedOnMount) {
        if (isComplete) {
          showToast('success', 'Your changes have been saved!', {
            toastId: 'submitted'
          })
        }
        await updateListing(values)
      } else {
        setIsSavedOnMount(true)
      }
    }
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <EmbedAutosave
        formik={formik}
        debounceMs={1000} />
      <PropertyInputGroup formik={formik} />
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
          type="submit" />
      </FlexRow>
    </Form>
  )
}

export default EditForm
