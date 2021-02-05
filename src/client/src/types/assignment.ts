import { Document } from 'mongoose'
import { ICourseDoc } from './course'
import { IRequirementDoc } from './requirement'
import { IUserDoc } from './user'

export interface IAssignmentDoc extends Document {
  requirementId: string
  requirement: IRequirementDoc
  // if user is null, means this is a fixed assignment
  userId: string | null
  user: IUserDoc | null
  // crseId in roster data
  courseId: number
  courseData: ICourseDoc
}
