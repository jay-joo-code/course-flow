import { generateInfosciTemplate, generateCsTemplate } from './../util/database'
import User from './../models/User'
import Major from './../models/Major'
import Course from './../models/Course'
import Requirement from './../models/Requirement'
import Template from './../models/Template'
import Plan from './../models/Plan'
import { DEV_MAJOR_CS_ID, ENGI_MATH1910, ENGI_FWS, TEMPLATE_CS } from './../util/data'
import { fetchClasses } from './../util/roster'

export default async () => {
  // const docs = await Course.find({ 'data.crseId': 352307 })
  // console.log('docs', docs)
  // const major = await Major.findById('601ca53c15d6422f61d3edb8')
  // major.isComingSoon = false
  // const res = await major.save()
  // console.log('res', res)
}
