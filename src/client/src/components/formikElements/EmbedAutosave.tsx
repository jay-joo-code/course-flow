import React from 'react'
import styled from 'styled-components'
import debounce from 'just-debounce-it'

interface EmbedAutosaveProps {
  formik: any;
  debounceMs: number;
}

const EmbedAutosave = ({ formik, debounceMs }: EmbedAutosaveProps) => {
  const [lastSaved, setLastSaved] = React.useState<string | null>(null)
  const debouncedSubmit = React.useCallback(
    debounce(
      () =>
        formik.submitForm().then(() => setLastSaved(new Date().toISOString())),
      debounceMs
    ),
    [debounceMs, formik.submitForm]
  )

  React.useEffect(() => {
    debouncedSubmit()
  }, [debouncedSubmit, formik.values])

  return <div />

  // return (
  //   <>
  //     {!!formik.isSubmitting
  //       ? 'saving...'
  //       : lastSaved !== null
  //       ? `Last Saved: ${lastSaved}`
  //       : null}
  //   </>
  // );
}

export default EmbedAutosave
