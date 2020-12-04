
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
  authProvider: 'email' | 'google' | 'facebook' | 'github' | 'twitter' | 'kakao' | 'naver'
  email?: string
  password?: string
  providerId?: string
  providerData?: any
}
