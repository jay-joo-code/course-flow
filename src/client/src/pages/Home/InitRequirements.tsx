import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addRequirement } from 'src/slices/plan'

export const testRequirement = {
  // preset data
  tag: 'core',
  label: 'ENGRD 211x',
  major: 'cs',
  credits: 3,

  // configurable data
  options: [],
  chosenCourse: null,
  notes: '',
  isCustomCourse: false,
  isDone: false,
}

const InitRequirements = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(addRequirement({
      semester: 3,
      row: 1,
      requirement: testRequirement,
    }))
  }, [])

  return null
}

export default InitRequirements
