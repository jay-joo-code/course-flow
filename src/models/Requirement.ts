import { model, Schema } from 'mongoose'
import { IRequirementDoc } from 'src/client/src/types/requirement'

const requirementSchema = new Schema({
  // preset data
  tag: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  major: {
    type: String,
    default: 'cs',
  },
  credits: {
    type: Number,
  },

  // configurable data
  assignedCourseId: {
    type: Number,
  },
}, { timestamps: true })

requirementSchema.virtual('assignedCourse', {
  ref: 'Course',
  localField: 'assignedCourseId',
  foreignField: 'data.crseId',
})

export default model<IRequirementDoc>('Requirement', requirementSchema)
