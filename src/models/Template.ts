import { model, Schema } from 'mongoose'
import { ITemplateDoc } from 'src/client/src/types/Template'
import Major from './Major'
import Requirement from './Requirement'

const templateSchema = new Schema({
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
  semesters: {
    type: [[{
      type: Schema.Types.ObjectId,
      ref: Requirement,
    }]],
    default: [],
  },
}, {
  timestamps: true,
})

templateSchema.plugin(require('mongoose-autopopulate'))

export default model<ITemplateDoc>('Template', templateSchema)
