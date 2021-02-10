export const DEV_USER_ID = '600e46166422db47d6792b83'
export const DEV_MAJOR_CS_ID = '601ca53c15d6422f61d3edb3'
export const DEV_REQUIREMENT_1910_ID = '6021d6d81db19d82850b1df8'
export const DEV_REQUIREMENT_FWS1_ID = '6021d6db1db19d82850b1dfb'
export const DEV_REQUIREMENT_FWS2_ID = '6021da2d7823bd834b625d1b'

export const MATH_1910_CRSEID = '352255'

export const ENGI_MATH_1910 = {
  name: 'MATH 1910',
  majorId: DEV_MAJOR_CS_ID,
  credits: 4,
  isFixedAssignment: true,
  courseId: MATH_1910_CRSEID,
  description: 'Math requirement desc',
  links: [{ label: 'Google', href: 'https://www.google.com/' }],
}

export const ENGI_FWS = {
  name: 'FWS',
  majorId: DEV_MAJOR_CS_ID,
  credits: 3,
  isFixedAssignment: false,
  description: 'FWS desc',
  links: [{ label: 'Google', href: 'https://www.google.com/' }],
}

export const TEMPLATE_CS = {
  majorId: DEV_MAJOR_CS_ID,
  semesters: [[DEV_REQUIREMENT_1910_ID, DEV_REQUIREMENT_FWS1_ID], [DEV_REQUIREMENT_FWS2_ID]],
}

export const ENGI_MAJORS = [
  {
    slug: 'BE',
    name: 'Biological Engineering',
    department: '601c9c36810d1f2bf3620fd7',
    isComingSoon: true,
  },
  {
    slug: 'BME',
    name: 'Biomedical Engineering',
    department: '601c9c36810d1f2bf3620fd7',
    isComingSoon: true,
  },
  {
    slug: 'ChemE',
    name: 'Chemical Engineering',
    department: '601c9c36810d1f2bf3620fd7',
    isComingSoon: true,
  },
  {
    slug: 'CEE',
    name: 'Civil Engineering',
    department: '601c9c36810d1f2bf3620fd7',
    isComingSoon: true,
  },
  {
    slug: 'CS',
    name: 'Computer Science',
    department: '601c9c36810d1f2bf3620fd7',
    isComingSoon: false,
  },
  {
    slug: 'EAS',
    name: 'Earth and Atmospheric Sciences',
    department: '601c9c36810d1f2bf3620fd7',
    isComingSoon: true,
  },
  {
    slug: 'ECE',
    name: 'Electrical and Computer Engineering',
    department: '601c9c36810d1f2bf3620fd7',
    isComingSoon: true,
  },
  {
    slug: 'EP',
    name: 'Engineering Physics',
    department: '601c9c36810d1f2bf3620fd7',
    isComingSoon: true,
  },
  {
    slug: 'EnvE',
    name: 'Environmental Engineering',
    department: '601c9c36810d1f2bf3620fd7',
    isComingSoon: true,
  },
  {
    slug: 'ISST',
    name: 'Information Science',
    department: '601c9c36810d1f2bf3620fd7',
    isComingSoon: true,
  },
  {
    slug: 'MSE',
    name: 'Materials Science',
    department: '601c9c36810d1f2bf3620fd7',
    isComingSoon: true,
  },
  {
    slug: 'MechE',
    name: 'Mechanical Engineering',
    department: '601c9c36810d1f2bf3620fd7',
    isComingSoon: true,
  },
  {
    slug: 'ORE',
    name: 'Operations Research',
    department: '601c9c36810d1f2bf3620fd7',
    isComingSoon: true,
  },
]
