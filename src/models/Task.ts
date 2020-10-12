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

export default mongoose.model('Task', taskSchema)
