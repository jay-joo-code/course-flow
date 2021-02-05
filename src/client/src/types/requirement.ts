import { Document } from 'mongoose'
import { IMajorDoc } from './major'

export type ISemesters = string[][]
export type ISemester = string[]

interface ILink {
  label: string
  href: string
}

export interface IRequirementDoc extends Document {
  name: string
  majorId: string
  major: IMajorDoc
  credits: number
  isFixedAssignment: boolean

  // requirement information (optional)
  description?: string
  links?: ILink[]
}
