import { Document, model, Schema } from 'mongoose'

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
  options: {
    type: [{
      label: {
        type: String,
        required: true,
      },
    }],
  },
  chosenCourse: {
    type: String,
  },
  notes: {
    type: String,
  },
  isCustomCourse: {
    type: Boolean,
    default: false,
  },
  customCourse: {
    type: String,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  semester: {
    type: Number,
    required: true,
  },
  row: {
    type: Number,
    required: true,
  },
}, { timestamps: true })

export interface IRequirement extends Document {
  _id: string
  createdAt: Date
  updatedAt: Date

  // preset data
  tag: string
  label: string
  user: string
  major: string
  credits?: number

  // configurable data
  options: IOption[]
  chosenCourse?: string
  notes?: string
  isCustomCourse: boolean
  customCourse?: string
  isDone: boolean
  semester: number
  row: number
}

interface IOption {
  label: string
}

export default model<IRequirement>('Requirement', requirementSchema)
