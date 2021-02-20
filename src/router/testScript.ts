import { generateCsTemplate } from './../util/database'
import User from './../models/User'
import Major from './../models/Major'
import Course from './../models/Course'
import Requirement from './../models/Requirement'
import Template from './../models/Template'
import Plan from './../models/Plan'
import { DEV_MAJOR_CS_ID, ENGI_MATH1910, ENGI_FWS, TEMPLATE_CS } from './../util/data'

export default async () => {
  // const major = await Major.findOne({ name: 'Computer Science' })
  // const template = await Template.findOne({ majorId: major._id })
  // template.semesters = [[], ...template.semesters]
  // await template.save()
  // console.log('template updated')

  const plan = await Plan.findOne({ shortId: 'mMpVAFh6' })
  console.log('plan', plan)

  // generateCsTemplate()
}
