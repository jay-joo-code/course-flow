import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/types/redux'
import CourseInfo from './CourseInfo'
import CourseSearch from './CourseSearch'

interface AssignSideWindowProps {
  requirementId: string
}

const AssignSideWindow = ({ requirementId }: AssignSideWindowProps) => {
  return null
  // if (assignedCourseId) {
  //   return <CourseInfo
  //     assignedCourse={assignedCourse}
  //     requirementId={requirementId}
  //   />
  // }

  // return <CourseSearch requirementId={requirementId} />
}

export default AssignSideWindow
