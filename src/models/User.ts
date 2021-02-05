import { model, Schema } from 'mongoose'
import autopopulate from 'mongoose-autopopulate'
import { IUserDoc } from 'src/client/src/types/user'
import Requirement from './Requirement'
import Major from './Major'

const userSchema = new Schema({
  authProvider: {
    // 'google'
    type: String,
  },
  providerId: {
    type: String,
  },
  providerData: {
    type: Schema.Types.Mixed,
  },
  majorId: {
    type: String,
  },
  major: {
    type: Schema.Types.ObjectId,
    ref: Major,
    autopopulate: true,
  },
  semesters: {
    type: [[{
      type: Schema.Types.ObjectId,
      ref: Requirement,
    }]],
    default: [],
  },
}, { timestamps: true })

userSchema.plugin(autopopulate)

export default model<IUserDoc>('User', userSchema)
