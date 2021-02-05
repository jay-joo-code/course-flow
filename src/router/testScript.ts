import User from './../models/User'
import Major from './../models/Major'
import Course from './../models/Course'
import Requirement from './../models/Requirement'
import Assignment from './../models/Assignment'
import Template from './../models/Template'
import { DEV_MAJOR_CS_ID, ENGI_MATH_1910, ENGI_FWS, ASSIGNMENT_1910, TEMPLATE_CS } from './../util/data'

export default async () => {
  // await new Assignment(ASSIGNMENT_1910).save()

  await new Template(TEMPLATE_CS).save()

  const docs = await Template.find()
  console.log('docs', docs[0].toObject())
}
