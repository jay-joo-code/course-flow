
export interface AuthState {
  accessToken: string | null
}

export interface PlanState {
  semesters: ISemesters
}

// nth index represents nth semester
// index 0 is an empty array because there is no 0th semester
export type ISemesters = (IRequirements)[]

// sorted in order of rows
// null for empty space
export type IRequirements = (IRequirement | RequirementDoc | null)[]

export interface RootState {
  authState: AuthState
  planState: PlanState
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
  // preset data
  tag: string
  label: string
  major: string
  credits?: number

  // configurable data
  options: IOption[]
  chosenCourse?: string | null
  notes?: string
  isCustomCourse: boolean
  customCourse?: string
  isDone: boolean
}

export interface RequirementDoc extends IRequirement {
  _id: string
  createdAt: Date
  updatedAt: Date
  user: string
  semester: number
  row: number
}

interface IOption {
  label: string
}
