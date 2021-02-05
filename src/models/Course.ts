import { model, Schema } from 'mongoose'
import { ICourseDoc } from 'src/client/src/types/course'

const courseSchema = new Schema({
  data: {
    type: Schema.Types.Mixed,
    required: true,
  },
}, { timestamps: true })

export default model<ICourseDoc>('Course', courseSchema)
