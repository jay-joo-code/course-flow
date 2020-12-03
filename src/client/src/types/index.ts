
export interface AuthState {
  accessToken: string | null
}

export interface RootState {
  authState: AuthState
}

export interface ITask {
  _id: string
  name: string
  complete: boolean
}
