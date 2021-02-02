export const courseName = (courseData: any): string => {
  if (!courseData) return ''
  return `${courseData.subject} ${courseData.catalogNbr}`
}

export const requirementCredits = (requirement: any): number => {
  if (!requirement) return 0
  if (requirement.assignedCourse) {
    return requirement.assignedCourse.enrollGroups[0].unitsMaximum
  } else {
    return requirement.credits
  }
}
