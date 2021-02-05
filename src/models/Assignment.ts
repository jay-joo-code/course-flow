import { model, Schema } from 'mongoose'
import { IAssignmentDoc } from 'src/client/src/types/Assignment'
import Requirement from './Requirement'
import User from './User'
import Course from './Course'

const assignmentSchema = new Schema({
  requirementId: {
    type: String,
    required: true,
  },
  requirement: {
    type: Schema.Types.ObjectId,
    ref: Requirement,
    autopopulate: true,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
    autopopulate: true,
  },
  courseId: {
    // crseId in roster data
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})

assignmentSchema.virtual('courseData', {
  ref: Course,
  localField: 'courseId',
  foreignField: 'data.crseId',
  justOne: true,
  autopopulate: true,
})

assignmentSchema.plugin(require('mongoose-autopopulate'))

export default model<IAssignmentDoc>('Assignment', assignmentSchema)
