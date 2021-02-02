import { Document } from 'mongoose'

export interface IUserDoc extends Document {
  _id: string
  authProvider: 'google'
  providerId?: string
  providerData?: any
  createdAt: Date
  updatedAt: Date
  validatePassword: (candidate: string) => boolean
}
