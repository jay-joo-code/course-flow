import { ISemesters } from './requirement'

export interface AuthState {
  accessToken: string | null
}

export interface PlanState {
  semesters: ISemesters
  major: string | null
}

export interface RootState {
  authState: AuthState
  planState: PlanState
}
