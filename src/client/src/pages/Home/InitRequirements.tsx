import { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initPlan } from 'src/slices/plan'
import { IRequirement, RootState } from 'src/types'

const emptyRequirement: IRequirement = {
  // preset data
  _id: '',
  isPlaceholder: false,
  tag: '',
  label: '',
  major: 'cs',
  credits: 0,
  initSemester: 0,
  initRow: 0,

  // configurable data
  options: [],
  chosenCourse: null,
  notes: '',
  isCustomCourse: false,
  isDone: false,
}

const generateRequirements = () => {
  const requirements: IRequirement[] = []
  let id = 0

  // common
  let tag = 'common'
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'FWS',
    credits: 3,
    initSemester: 1,
    initRow: 3,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'FWS',
    credits: 3,
    initSemester: 2,
    initRow: 3,
  })

  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'Liberal Studies',
    credits: 3,
    initSemester: 3,
    initRow: 4,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'Liberal Studies',
    credits: 3,
    initSemester: 4,
    initRow: 4,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'Liberal Studies',
    credits: 3,
    initSemester: 5,
    initRow: 4,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'Liberal Studies',
    credits: 3,
    initSemester: 6,
    initRow: 4,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'Liberal Studies',
    credits: 3,
    initSemester: 7,
    initRow: 4,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'Liberal Studies',
    credits: 3,
    initSemester: 8,
    initRow: 4,
  })

  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'PE',
    credits: 3,
    initSemester: 1,
    initRow: 4,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'PE',
    credits: 3,
    initSemester: 2,
    initRow: 4,
  })

  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'MATH 1910',
    credits: 4,
    initSemester: 1,
    initRow: 0,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'MATH 1920',
    credits: 4,
    initSemester: 2,
    initRow: 0,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'MATH 2940',
    credits: 4,
    initSemester: 3,
    initRow: 0,
  })

  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'CHEM 2090',
    credits: 4,
    initSemester: 1,
    initRow: 1,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'CHEM 2080',
    credits: 4,
    initSemester: 4,
    initRow: 1,
  })

  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'PHYS 1112',
    credits: 4,
    initSemester: 2,
    initRow: 1,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'PHYS 2213',
    credits: 4,
    initSemester: 3,
    initRow: 1,
  })

  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'CS 111x',
    credits: 4,
    initSemester: 1,
    initRow: 2,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'CS / ENGRD 211x',
    credits: 4,
    initSemester: 3,
    initRow: 2,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'ENGRD 2xxx',
    credits: 4,
    initSemester: 4,
    initRow: 0,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'ENGRI 1xxx',
    credits: 3,
    initSemester: 2,
    initRow: 2,
  })

  // core
  tag = 'core'
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'CS 2800',
    credits: 3,
    initSemester: 3,
    initRow: 3,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'CS 3110',
    credits: 4,
    initSemester: 5,
    initRow: 2,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'CS 3410 / 3420',
    credits: 4,
    initSemester: 4,
    initRow: 2,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'CS 4410',
    credits: 3,
    initSemester: 7,
    initRow: 2,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'CS 4820',
    credits: 4,
    initSemester: 6,
    initRow: 2,
  })

  // electives
  tag = 'elective'

  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'CS Elective',
    credits: 3,
    initSemester: 4,
    initRow: 3,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'CS Elective',
    credits: 3,
    initSemester: 5,
    initRow: 3,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'CS Elective',
    credits: 3,
    initSemester: 6,
    initRow: 3,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'CS Elective (Project)',
    credits: 2,
    initSemester: 7,
    initRow: 3,
  })

  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'Technical Elective',
    credits: 3,
    initSemester: 5,
    initRow: 1,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'Technical Elective',
    credits: 3,
    initSemester: 6,
    initRow: 1,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'Technical Elective',
    credits: 3,
    initSemester: 7,
    initRow: 1,
  })

  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'External Spec.',
    credits: 3,
    initSemester: 8,
    initRow: 0,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'External Spec.',
    credits: 3,
    initSemester: 8,
    initRow: 1,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'External Spec.',
    credits: 3,
    initSemester: 8,
    initRow: 2,
  })

  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'Advisor Elective',
    credits: 3,
    initSemester: 5,
    initRow: 0,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'Advisor Elective',
    credits: 3,
    initSemester: 6,
    initRow: 0,
  })

  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    tag,
    label: 'Major Elective',
    credits: 3,
    initSemester: 7,
    initRow: 0,
  })

  return requirements
}

const InitRequirements = () => {
  const dispatch = useDispatch()
  const { isInit } = useSelector((state: RootState) => state.planState)

  useEffect(() => {
    if (!isInit) {
      const requirements = generateRequirements()
      const idToRequirement = requirements.reduce((obj, item) => ({ ...obj, [item._id]: item }), {})
      dispatch(initPlan({ requirements, idToRequirement }))
    }
  }, [])

  return null
}

export default memo(InitRequirements)
