import { ISemesters } from './requirement'

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
