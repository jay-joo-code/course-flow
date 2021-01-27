import { createSlice } from '@reduxjs/toolkit'
import { IRequirement, PlanState, RequirementDoc } from 'src/types'

const initialState: PlanState = {
  semesters: [[], [], [], [], [], [], [], [], [], [], []],
  idToRequirement: {},
  isInit: false,
}

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    addRequirement: (state, { payload }) => {
      const { semester, row, requirement } = payload
      state.semesters[semester].splice(row, 0, requirement)
    },

    initPlan: (state, { payload }) => {
      const { requirements, idToRequirement } = payload
      state.idToRequirement = idToRequirement
      requirements.forEach((requirement) => {
        const { initSemester, initRow } = requirement
        state.semesters[initSemester].splice(initRow, 0, requirement)
      })
      state.isInit = true
    },

    moveRequirement: (state, { payload }) => {
      const { destSemesterNumber, destRow, requirementId } = payload

      // find target requirement
      const targetRequirement: (IRequirement | RequirementDoc | null) = state.idToRequirement[requirementId]

      const newSemesters = state.semesters.map((semester, semesterNumber) => {
        // remove requirement for all semesters
        let newSemester = semester.filter((requirement) => requirement?._id !== requirementId)

        // if this is destination semester, insert requirement
        if (semesterNumber === destSemesterNumber) {
          newSemester = [...newSemester.slice(0, destRow), targetRequirement, ...newSemester.slice(destRow)]
        }
        return newSemester
      })

      state.semesters = newSemesters
    },
    // resetAccessToken: (state) => {
    //   state.accessToken = null
    // },
    // logout: (state) => {
    //   state.accessToken = null
    // },
  },
})

export const { addRequirement, initPlan, moveRequirement } = planSlice.actions

export default planSlice.reducer
