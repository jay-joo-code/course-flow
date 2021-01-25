
export interface AuthState {
  accessToken: string | null
}

export interface RootState {
  authState: AuthState
}

export interface TaskDoc {
  _id: string
  name: string
  complete: boolean
  userId: string
}

export interface UserDoc {
  _id: string
  authProvider: 'google'
  providerId?: string
  providerData?: any
  createdAt: Date
  updatedAt: Date
  validatePassword: (candidate: string) => boolean
}

export interface IRequirement {
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
