import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AuthState } from "src/types";

const initialState: AuthState = {
  loading: false,
  currentUser: {},
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
    },

    loginSuccess: (state, { payload }: PayloadAction<any>) => {
      state.currentUser = payload
      state.isAuthenticated = true
      state.loading = false
    },

    loginError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.isAuthenticated = false
      state.loading = false
    },

    logout: (state) => {
      state.loading = true
    },

    logoutSuccess: (state) => {
      state.isAuthenticated = false
      state.currentUser = {}
      state.error = ''
      state.loading = false
    },
  },
})

export const { loginStart, loginSuccess, loginError, logout, logoutSuccess } = authSlice.actions

export default authSlice.reducer
