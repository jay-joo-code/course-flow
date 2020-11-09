
export interface AuthState {
  loading: boolean
  currentUser: object
  isAuthenticated: boolean
  error?: string
}

export interface CountState {
  count: number
}

export interface TokenState {
  token: string
}

export interface RootState {
  authState: AuthState
  countState: CountState
  tokenState: TokenState
}

export interface ITask {
  _id: string
  name: string
  complete: boolean
}
