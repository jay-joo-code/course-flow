import { Document } from 'mongoose'

export type ISemesterSlug = 'SP21' | 'FA20' | 'SP20'
export type ISubjectSlug = string

export interface ICourseDoc extends Document {

}
