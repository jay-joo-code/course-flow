import mongoose from 'mongoose'

const { Schema } = mongoose;

const noteSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Note', noteSchema)
