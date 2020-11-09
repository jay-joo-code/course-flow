
export interface AuthState {
  loading: boolean
  currentUser: object
  isAuthenticated: boolean
  error?: string
}

export interface CountState {
  count: number
}

export interface RootState {
  authState: AuthState
  countState: CountState
}

export interface ITask {
  _id: string
  name: string
  complete: boolean
}
