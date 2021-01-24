import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'src/components/buttons'
import { ListingDoc } from 'src/types'
import * as yup from 'yup'
import PropertyInputGroup from './PropertyInputGroup'

interface EditFormProps {
  listing: ListingDoc
}

const schema = yup.object().shape({
  rent: yup.number()
    .typeError('Rent must be a number'),
})

const EditForm = ({ listing }: EditFormProps) => {
  const { register, handleSubmit, errors } = useForm<ListingDoc>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })
  const onSubmit = (data: ListingDoc) => {
    console.log('handle submit', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PropertyInputGroup
        listing={listing}
        register={register}
        errors={errors}
      />
      <Button
        type='submit'
        label='submit'
      />
    </form>
  )
}

export default EditForm
