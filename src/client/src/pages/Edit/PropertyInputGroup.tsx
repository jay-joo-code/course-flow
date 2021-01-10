import React, { useState } from 'react'

import { Incrementor } from 'src/components/formElements'
import { FormikIncrementor, FormikSelect } from 'src/components/formikElements'
import { FlexColumn, Space } from 'src/components/layout'
import Text from 'src/components/text'
import useIsMobile from 'src/hooks/useIsMobile'
import styled from 'styled-components'

interface PropertyInputGroupProps {
  formik: any;
}

const PropertyInputGroup = ({ formik }: PropertyInputGroupProps) => {
  const regionOptions = [
    {
      label: 'Belle Sherman',
      value: '1'
    },
    {
      label: 'Collegetown-Lower',
      value: '2'
    },
    {
      label: 'Collegetown-Upper',
      value: '3'
    },
    {
      label: 'Commons',
      value: '4'
    },
    {
      label: 'Downtown',
      value: '5'
    },
    {
      label: 'East Hill',
      value: '6'
    },
    {
      label: 'Fall Creek',
      value: '7'
    },
    {
      label: 'North Campus',
      value: '8'
    },
    {
      label: 'Northeast',
      value: '9'
    },
    {
      label: 'South Hill',
      value: '10'
    },
    {
      label: 'West Campus',
      value: '11'
    },
    {
      label: 'West Hill',
      value: '12'
    }
  ]

  const propertyTypeOptions = [
    {
      label: 'Apartment',
      value: '1'
    },
    {
      label: 'House',
      value: '2'
    },
    {
      label: 'Townhouse',
      value: '3'
    },
    {
      label: 'Condo',
      value: '4'
    }
  ]

  const furnishingOptions = [
    {
      label: 'Unfurnished',
      value: '1'
    },
    {
      label: 'Partially Furnished',
      value: '2'
    },
    {
      label: 'Fully Furnished',
      value: '3'
    }
  ]

  const isMobile = useIsMobile()

  return (
    <FlexColumn>
      <Text variant="h3">Property</Text>
      <Space margin="1rem 0" />
      <FormikSelect
        formik={formik}
        name="regionCode"
        options={regionOptions}
        label="Region"
      />
      <Space margin=".8rem 0" />
      <FormikSelect
        formik={formik}
        name="propertyTypeCode"
        options={propertyTypeOptions}
        label="Property Type"
      />
      <Space margin=".8rem 0" />
      <FormikSelect
        formik={formik}
        name="furnishingCode"
        options={furnishingOptions}
        label="Furnishing"
      />
      <Space margin="1rem 0" />
      <FormikIncrementor
        formik={formik}
        name="bedroomsTotal"
        label={
          isMobile
            ? `Bedrooms in the entire
          space`
            : 'Bedrooms in the entire space'
        }
        minValue={1}
      />
      <Space margin=".6rem 0" />
      <FormikIncrementor
        formik={formik}
        name="bedroomsAvailable"
        label={
          isMobile
            ? `Bedrooms available for
          sublet`
            : 'Bedrooms available for sublet'
        }
        minValue={1}
        maxValue={formik.values.bedroomsTotal}
      />
      <Space margin=".6rem 0" />
      <FormikIncrementor
        formik={formik}
        name="bathroomsTotal"
        label={
          isMobile
            ? `Bathrooms in the entire
          space`
            : 'Bathrooms in the entire space'
        }
        step={0.5}
        minValue={1}
      />
    </FlexColumn>
  )
}

export default PropertyInputGroup
