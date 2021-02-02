import { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initPlan } from 'src/slices/plan'
import { RootState } from 'src/types/redux'
import { IRequirement, ISemesters } from 'src/types/requirement'

const emptyRequirement: IRequirement = {
  // preset data
  _id: '',
  label: '',
  major: 'cs',
  credits: 0,

  // assign course
  isDefaultAssigned: false,
  assignedCourseId: null,
  assignedCourse: null,

  // information (optional)
  description: 'test description',
  links: [{
    label: 'test link',
    href: 'https://www.google.com/',
  }],
}

const generateRequirements = () => {
  const requirements: IRequirement[] = []
  let id = 0

  // common
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'FWS',
    credits: 3,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'FWS',
    credits: 3,
  })

  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'Liberal Studies',
    credits: 3,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'Liberal Studies',
    credits: 3,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'Liberal Studies',
    credits: 3,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'Liberal Studies',
    credits: 3,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'Liberal Studies',
    credits: 3,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'Liberal Studies',
    credits: 3,
  })

  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'PE',
    credits: 3,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'PE',
    credits: 3,
  })

  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'MATH 1910',
    credits: 4,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'MATH 1920',
    credits: 4,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'MATH 2940',
    credits: 4,
  })

  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'CHEM 2090',
    credits: 4,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'CHEM 2080',
    credits: 4,
  })

  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'PHYS 1112',
    credits: 4,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'PHYS 2213',
    credits: 4,
  })

  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'CS 111x',
    credits: 4,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'CS / ENGRD 211x',
    credits: 4,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'ENGRD 2xxx',
    credits: 4,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'ENGRI 1xxx',
    credits: 3,
  })

  // core
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'CS 2800',
    credits: 3,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'CS 3110',
    credits: 4,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'CS 3410 / 3420',
    credits: 4,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'CS 4410',
    credits: 3,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'CS 4820',
    credits: 4,
  })

  // electives

  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'CS Elective',
    credits: 3,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'CS Elective',
    credits: 3,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'CS Elective',
    credits: 3,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'CS Elective (Project)',
    credits: 2,
  })

  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'Technical Elective',
    credits: 3,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'Technical Elective',
    credits: 3,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'Technical Elective',
    credits: 3,
  })

  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'External Spec.',
    credits: 3,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'External Spec.',
    credits: 3,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'External Spec.',
    credits: 3,
  })

  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'Advisor Elective',
    credits: 3,
  })
  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'Advisor Elective',
    credits: 3,
  })

  requirements.push({
    ...emptyRequirement,
    _id: `${++id}`,
    label: 'Major Elective',
    credits: 3,
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
      const semesters: ISemesters = [[]]
      requirements.forEach((requirement, idx) => {
        if (idx % 5 === 0) {
          semesters.push([])
        }
        semesters[semesters.length - 1].push(requirement._id)
      })
      dispatch(initPlan({ semesters, idToRequirement }))
    }
  }, [])

  return null
}

export default memo(InitRequirements)
