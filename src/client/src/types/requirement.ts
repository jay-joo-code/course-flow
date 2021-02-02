import { Document } from 'mongoose'

export type ISemesters = string[][]
export type ISemester = string[]
export type IDynRequirements = IDynRequirement[]
export type IDynRequirement = IRequirement | IRequirementDoc

export interface IRequirement {
  // preset data
  _id: string
  label: string
  major: string
  credits?: number

  // assign course
  isDefaultAssigned: boolean
  assignedCourseId?: number
  assignedCourse?: any

  // information (optional)
  description?: string
  links?: ILink[]
}

interface ILink {
  label: string
  href: string
}

export interface IRequirementDoc extends Document {
  // TODO: implement after sign in feature
  isPlaceholder: boolean
  createdAt: Date
  updatedAt: Date
  user: string
}
