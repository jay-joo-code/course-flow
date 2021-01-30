
export interface AuthState {
  accessToken: string | null
}

export interface PlanState {
  semesters: ISemesters
  idToRequirement: any
  isInit: boolean
}

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

// nth index represents nth semester
// index 0 is transfer credits
export type ISemesters = (IRequirements)[]

// sorted in order of rows
// null for empty space
export type IRequirements = IDynRequirement[]

export type IDynRequirement = IRequirement | RequirementDoc | IPlaceholder

export interface IPlaceholder {
  _id: string
  isPlaceholder: boolean
  isRemoveOnRender: boolean
}

export interface IRequirement {
  // preset data
  _id: string
  isPlaceholder: boolean
  tag: string
  label: string
  major: string
  credits?: number
  initSemester: number
  initRow: number

  // configurable data
  options: IOption[]
  chosenCourse?: string | null
  notes?: string
  isCustomCourse: boolean
  customCourse?: string
  isDone: boolean
}

export interface RequirementDoc extends IRequirement {
  createdAt: Date
  updatedAt: Date
  user: string
  semester: number
  row: number
}

interface IOption {
  label: string
}
