
import axios from 'axios'
import { ISemesterSlug, ISubjectSlug } from 'src/client/src/types/roster'

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

export const fetchAllClasses = (subjectSlug: ISubjectSlug): Promise<any[]> => new Promise((resolve, reject) => {
  (async () => {
    const slugs = ['FA19', 'SP20', 'FA20', 'SP21']

    const promises = slugs.map((slug) => new Promise((resolve, reject) => {
      (async () => {
        try {
          resolve((await axios.get(`${BASE_URL}/search/classes.json?roster=${slug}&subject=${subjectSlug}`)).data.data.classes)
        } catch (error) {
          reject(error.response)
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
