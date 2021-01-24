import React from 'react'
import { Checkbox } from 'src/components/formElements'
import { FormikInput, FormikRadioGroup } from 'src/components/formikElements'
import { FlexColumn, Space } from 'src/components/layout'
import Text from 'src/components/text'

interface UtilityInputGroupProps {
  formik: any;
}

const UtilityInputGroup = ({ formik, }: UtilityInputGroupProps) => {
  const isUtilIncludedOptions = [
    {
      label: 'All are utilities included in the rent',
      value: true,
    },
    {
      label: 'Utilities must be paid separately',
      value: false,
    },
  ]

  const handleSeparateUtilsChange = (e, utility: string) => {
    if (e.currentTarget.checked) {
      formik.setFieldValue('separateUtils', [...formik.values.separateUtils, utility])
    } else {
      const newValues = [...formik.values.separateUtils]
      newValues.splice(newValues.indexOf(utility), 1)
      formik.setFieldValue('separateUtils', newValues)
    }
  }

  const separateUtilsOptions = [
    {
      label: 'Gas',
      value: 'gas',
    },
    {
      label: 'Wifi',
      value: 'wifi',
    },
    {
      label: 'Electricity',
      value: 'electricity',
    },
    {
      label: 'Water',
      value: 'water',
    },
    {
      label: 'Garbage',
      value: 'garbage',
    },
  ]

  return (
    <FlexColumn>
      <Text variant="h3">Utilities</Text>
      <Space margin="1rem 0" />
      <FormikRadioGroup
        formik={formik}
        name='isUtilIncluded'
        options={isUtilIncludedOptions}
        convertValueToString
      />
      <Space margin='1rem 0' />
      {formik.values.isUtilIncluded === false && (
        <FlexColumn>
          <Text variant="h3">Which utilities must be paid separately?</Text>
          <Space margin='.7rem 0' />
          {separateUtilsOptions.map(({ label, value, }) => (
            <>
              <Space margin='.3rem 0' />
              <Checkbox
                label={label}
                checked={formik.values.separateUtils.includes(value)}
                onChange={(e) => handleSeparateUtilsChange(e, value)}
              />
            </>
          ))}
          <Space margin='.8rem 0' />
          <FormikInput
            formik={formik}
            name='utilCost'
            label='Approx. Monthly Utility Costs'
            width={250}
          />
        </FlexColumn>
      )}
    </FlexColumn>
  )
}

export default UtilityInputGroup
