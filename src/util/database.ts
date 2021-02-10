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
