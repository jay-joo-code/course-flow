import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import autopopulate from 'mongoose-autopopulate'

const { Schema } = mongoose;

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
  }
}, { timestamps: true });

export interface UserDoc extends mongoose.Document {
  _id: string
  authProvider: 'google'
  providerId?: string
  providerData?: any
  createdAt: Date
  updatedAt: Date
  validatePassword: (candidate: string) => boolean
}

userSchema.plugin(autopopulate);

export default mongoose.model<UserDoc>('User', userSchema);
