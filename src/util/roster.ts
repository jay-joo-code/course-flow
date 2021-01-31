import axios from 'axios'
import { ISemesterSlug, ISubjectSlug } from 'src/client/src/types/roster'
import Course from './../models/Course'

const BASE_URL = 'https://classes.cornell.edu/api/2.0'

export const fetchSubjects = async (semester: ISemesterSlug) => {
  try {
    const result = await axios.get(`${BASE_URL}/config/subjects.json?roster=${semester}`)

    if (result.status !== 200) {
      return []
    }
    return result.data.data.subjects
  } catch (error) {
    return error.response
  }
}

export const fetchClasses = async (semester: ISemesterSlug, subjectSlug: ISubjectSlug) => {
  try {
    const result = await axios.get(`${BASE_URL}/search/classes.json?roster=${semester}&subject=${subjectSlug}`)

    if (result.status !== 200) {
      return []
    }
    return result.data.data.classes
  } catch (error) {
    return error.response
  }
}

export const fetchAllClassesBySubject = (subjectSlug: ISubjectSlug): Promise<any[]> => new Promise((resolve, reject) => {
  (async () => {
    const slugs = ['FA19', 'SP20', 'FA20', 'SP21']

    const promises = slugs.map((slug) => new Promise((resolve, reject) => {
      (async () => {
        try {
          resolve((await axios.get(`${BASE_URL}/search/classes.json?roster=${slug}&subject=${subjectSlug}`)).data.data.classes)
        } catch (error) {
          resolve([])
        }
      })()
    }))

    Promise.all(promises)
      .then((classesBySemester) => {
        const crseIds = {}
        const mergedClasses = []
        classesBySemester.forEach((classes: any[]) => {
          classes.forEach((classData) => {
            if (!crseIds[classData.crseId]) {
              crseIds[classData.crseId] = classData.crseId
              mergedClasses.push(classData)
            }
          })
        })
        resolve(mergedClasses)
      })
      .catch((e) => reject(e))
  })()
})

export const fetchAllClasses = (): Promise<any[]> => new Promise((resolve) => {
  (async () => {
    const subjects = await fetchSubjects('SP21')
    let allClasses = []
    const promises = subjects.map(({ value }, idx): Promise<void> => new Promise((resolve) => {
      setTimeout(() => {
        (async () => {
          const classes = await fetchAllClassesBySubject(value)
          allClasses = allClasses.concat(classes)
          console.log(`Fetched ${classes.length} ${value} courses`)
          resolve()
        })()
      }, 1000 * idx)
    }))
    await Promise.all(promises)
    resolve(allClasses)
  })()
})

export const initDatabase = async () => {
  try {
    const classes = await fetchAllClasses()
    console.log(`Saving ${classes.length} courses to the database ...`)

    try {
      Course.collection.drop()
    } catch (error) {
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
