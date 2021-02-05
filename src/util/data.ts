export const DEV_USER_ID = '600e46166422db47d6792b83'
export const DEV_MAJOR_CS_ID = '601ca53c15d6422f61d3edb3'
export const DEV_REQUIREMENT_1910_ID = '601cc68259619d3836ad4964'
export const DEV_REQUIREMENT_FWS1_ID = '601cc76ebf8b79387f000674'
export const DEV_REQUIREMENT_FWS2_ID = '601cc7e0f9158f38a51486f9'

export const MATH_1910_CRSEID = '352255'

export const ENGI_MATH_1910 = {
  name: '1910',
  majorId: DEV_MAJOR_CS_ID,
  major: DEV_MAJOR_CS_ID,
  credits: 4,
  isFixedAssignment: true,
  description: 'Math requirement desc',
  links: [{ label: 'Google', href: 'https://www.google.com/' }],
}

export const ENGI_FWS = {
  name: 'FWS',
  majorId: DEV_MAJOR_CS_ID,
  major: DEV_MAJOR_CS_ID,
  credits: 3,
  isFixedAssignment: true,
  description: 'FWS desc',
  links: [{ label: 'Google', href: 'https://www.google.com/' }],
}

export const ASSIGNMENT_1910 = {
  requirementId: DEV_REQUIREMENT_1910_ID,
  requirement: DEV_REQUIREMENT_1910_ID,
  userId: DEV_USER_ID,
  user: DEV_USER_ID,
  courseId: MATH_1910_CRSEID,
}

export const TEMPLATE_CS = {
  majorId: DEV_MAJOR_CS_ID,
  major: DEV_MAJOR_CS_ID,
  semesters: [[DEV_REQUIREMENT_1910_ID, DEV_REQUIREMENT_FWS1_ID], [DEV_REQUIREMENT_FWS2_ID]],
}
