import { IMajorDoc } from 'src/client/src/types/major'
import Course from '../models/Course'
import Requirement from '../models/Requirement'
import Template from '../models/Template'
import Department from '../models/Department'
import Major from '../models/Major'
import { ISST_3300OR4300, ISST_SPELECTIVE, ISST_ORIE3300, ISST_ORIE3500, ISST_CS2800, ISST_INFO2040, ISST_ENGRD2700, ENGI_CHEM2090, ENGI_CS111X, ENGI_ENGRI1XXX, ENGI_FWS, ENGI_MATH1910, ENGI_MATH1920, ENGI_MATH2940, ENGI_PE, ENGI_PHYS1112, ENGI_PHYS2213, ENGI_CS2110, ENGI_CS2800, ENGI_LIBSTUD, ENGI_ENGRD, ENGI_CHEM2080, ENGI_CS3410, ENGI_MAJELECTIVE, ENGI_ADVELECTIVE, ENGI_CS4820, ENGI_CS4410, ENGI_CS3110, ISST_INFO2450, ISST_PHYS2214, ISST_INFO2300, ISST_ORIE3800 } from './data'
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

export const generateInfosciTemplate = async () => {
  try {
    const reqs = [
      [],
      [ENGI_MATH1910, ENGI_CHEM2090, ENGI_CS111X, ENGI_FWS, ENGI_PE],
      [ENGI_MATH1920, ENGI_PHYS1112, ENGI_ENGRI1XXX, ENGI_FWS, ENGI_PE],
      [ENGI_MATH2940, ENGI_PHYS2213, ISST_ENGRD2700, ISST_INFO2040, ISST_INFO2450],
      [ISST_PHYS2214, ISST_INFO2300, ENGI_CS2110, ISST_CS2800, ENGI_LIBSTUD],
      [ISST_SPELECTIVE, ISST_ORIE3300, ISST_ORIE3500, ENGI_ADVELECTIVE, ENGI_LIBSTUD],
      [ISST_ORIE3800, ISST_3300OR4300, ISST_SPELECTIVE, ENGI_ADVELECTIVE, ENGI_LIBSTUD],
      [ENGI_MAJELECTIVE, ISST_SPELECTIVE, ISST_SPELECTIVE, ISST_SPELECTIVE, ENGI_LIBSTUD],
      [ENGI_MAJELECTIVE, ISST_SPELECTIVE, ISST_SPELECTIVE, ENGI_LIBSTUD, ENGI_LIBSTUD],
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

    const targetMajor = await Major.findOne({ name: 'Information Science' })
    const template = await Template.findOne({ majorId: targetMajor._id })
    if (template) {
      template.semesters = semesters
      await template.save()
    } else {
      await new Template({
        majorId: targetMajor._id,
        semesters,
      }).save()
    }

    console.log('ISST template updated')
  } catch (error) {
    console.log('error', error)
    return error
  }
}
