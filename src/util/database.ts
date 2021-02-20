import { IMajorDoc } from 'src/client/src/types/major'
import Course from '../models/Course'
import Requirement from '../models/Requirement'
import Template from '../models/Template'
import Department from '../models/Department'
import Major from '../models/Major'
import { ENGI_CHEM2090, ENGI_CS111X, ENGI_ENGRI1XXX, ENGI_FWS, ENGI_MATH1910, ENGI_MATH1920, ENGI_MATH2940, ENGI_PE, ENGI_PHYS1112, ENGI_PHYS2213, ENGI_CS2110, ENGI_CS2800, ENGI_LIBSTUD, ENGI_ENGRD, ENGI_CHEM2080, ENGI_CS3410, ENGI_MAJELECTIVE, ENGI_ADVELECTIVE, ENGI_CS4820, ENGI_CS4410, ENGI_CS3110 } from './data'
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

export const generateCsTemplate = async () => {
  try {
    const reqs = [
      [],
      [ENGI_MATH1910, ENGI_CHEM2090, ENGI_CS111X, ENGI_FWS, ENGI_PE],
      [ENGI_MATH1920, ENGI_PHYS1112, ENGI_ENGRI1XXX, ENGI_FWS, ENGI_PE],
      [ENGI_MATH2940, ENGI_PHYS2213, ENGI_CS2110, ENGI_CS2800, ENGI_LIBSTUD],
      [ENGI_ENGRD, ENGI_CHEM2080, ENGI_CS3410, ENGI_MAJELECTIVE, ENGI_LIBSTUD],
      [ENGI_ADVELECTIVE, ENGI_MAJELECTIVE, ENGI_CS3110, ENGI_MAJELECTIVE, ENGI_LIBSTUD],
      [ENGI_ADVELECTIVE, ENGI_MAJELECTIVE, ENGI_CS4820, ENGI_MAJELECTIVE, ENGI_LIBSTUD],
      [ENGI_MAJELECTIVE, ENGI_MAJELECTIVE, ENGI_CS4410, ENGI_MAJELECTIVE, ENGI_LIBSTUD],
      [ENGI_MAJELECTIVE, ENGI_MAJELECTIVE, ENGI_MAJELECTIVE, ENGI_LIBSTUD],
    ]
    const promises = reqs.map((reqList) => reqList.map((req) => new Promise((resolve) => {
      (async () => {
        const newReq = await new Requirement(req).save()
        resolve(newReq._id)
      })()
    })))

    const semesters = await Promise.all(promises.map((innerPromiseArray) => {
      return Promise.all(innerPromiseArray)
    }))

    const csMajor = await Major.findOne({ name: 'Computer Science' })
    const template = await Template.findOne({ majorId: csMajor._id })
    template.semesters = semesters
    await template.save()

    console.log('CS template updated')
  } catch (error) {
    console.log('error', error)
    return error
  }
}
