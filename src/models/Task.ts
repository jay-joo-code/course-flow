import mongoose from 'mongoose'

const { Schema } = mongoose;

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export interface TaskDoc extends mongoose.Document {
  _id: string
  name: string
  complete: boolean
}

export default mongoose.model<TaskDoc>('Task', taskSchema)
