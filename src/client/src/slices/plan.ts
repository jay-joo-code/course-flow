import { createSlice } from '@reduxjs/toolkit'
import { PlanState } from 'src/types'

const initialState: PlanState = {
  semesters: [[], [], [], [], [], [], [], [], [], [], []],
}

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    addRequirement: (state, { payload }) => {
      const { semester, row, requirement } = payload
      state.semesters[semester].splice(row, 0, requirement)
    },
    // resetAccessToken: (state) => {
    //   state.accessToken = null
    // },
    // logout: (state) => {
    //   state.accessToken = null
    // },
  },
})

export const { addRequirement } = planSlice.actions

export default planSlice.reducer
