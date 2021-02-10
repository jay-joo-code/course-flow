import { model, Schema } from 'mongoose'
import { IRequirementDoc } from 'src/client/src/types/requirement'
import Major from './Major'
import Course from './Course'

const requirementSchema = new Schema({
  // preset data
  name: {
    type: String,
    required: true,
  },
  majorId: {
    type: String,
    required: true,
  },
  major: {
    type: Schema.Types.ObjectId,
    ref: Major,
    autopopulate: true,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  isFixedAssignment: {
    type: Boolean,
    required: true,
  },
  courseId: {
    type: Number,
  },

  // requirement information (optional)
  description: {
    type: String,
  },
  links: {
    type: [{
      label: {
        type: String,
        required: true,
      },
      href: {
        type: String,
        required: true,
      },
    }],
  },
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
}
)

requirementSchema.virtual('course', {
  ref: Course,
  localField: 'courseId',
  foreignField: 'data.crseId',
  justOne: true,
  autopopulate: true,
})

requirementSchema.plugin(require('mongoose-autopopulate'))

export default model<IRequirementDoc>('Requirement', requirementSchema)
