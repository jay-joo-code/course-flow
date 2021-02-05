import { IMajorDoc } from 'src/client/src/types/major'
import Course from '../models/Course'
import Department from '../models/Department'
import Major from '../models/Major'
import { fetchAllClasses } from './roster'

export const initCourses = async () => {
  try {
    // course
    const classes = await fetchAllClasses()
    console.log(`Saving ${classes.length} courses to the database ...`)

    const doc = await Course.findOne()
    if (doc) {
      console.log('Course collection exists. Dropping ...')
      Course.collection.drop()
      console.log('Dropped')
    }

    const promises = classes.map((classData, idx): Promise<void> => new Promise((resolve, reject) => {
      (async () => {
        try {
          await new Course({ data: classData }).save()
          console.log(`${idx} Saved ${classData.subject} ${classData.catalogNbr}`)
          resolve()
        } catch (error) {
          reject(error)
        }
      })()
    }))
    await Promise.all(promises)
    const courses = await Course.find()
    console.log(`Saved ${courses.length} courses to the database!`)
  } catch (error) {
    return error
  }
}

export const addDepartments = async () => {
  try {
    const departments = ['Engineering']
    console.log(`Saving ${departments.length} departments to the database ...`)

    const promises = departments.map((name) => new Promise<void>((resolve, reject) => {
      (async () => {
        try {
          await new Department({ name }).save()
          resolve()
        } catch (error) {
          reject(error)
        }
      })()
    }))
    await Promise.all(promises)
    console.log(`Saved ${departments.length} departments to the database!`)
  } catch (error) {
    return error
  }
}

export const engineeringMajors = [
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
    slug: 'Operations Research',
    name: 'ORE',
    department: '601c9c36810d1f2bf3620fd7',
    isComingSoon: true,
  },
]

export const addMajors = async (majors: IMajorDoc[]) => {
  try {
    console.log(`Saving ${majors.length} majors to the database ...`)

    const promises = majors.map((data) => new Promise<void>((resolve, reject) => {
      (async () => {
        try {
          await new Major(data).save()
          resolve()
        } catch (error) {
          reject(error)
        }
      })()
    }))
    await Promise.all(promises)
    console.log(`Saved ${majors.length} majors to the database!`)
  } catch (error) {
    console.log('error', error)
    return error
  }
}
