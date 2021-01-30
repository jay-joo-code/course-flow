import { createSlice } from '@reduxjs/toolkit'
import { IDynRequirement, PlanState } from 'src/types'
import { IPlaceholder } from './../types/index'

const generatePlaceholder = () => ({
  _id: `${Math.random()}`,
  isPlaceholder: true,
  isRemoveOnRender: false,
})

const emptySemesters: IPlaceholder[][] = [...Array(11)].map(() => [generatePlaceholder(), generatePlaceholder(), generatePlaceholder(), generatePlaceholder(), generatePlaceholder()])

const initialState: PlanState = {
  semesters: emptySemesters,
  idToRequirement: {},
  isInit: false,
}

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    addRequirement: (state, { payload }) => {
      const { semesterNumber, row, requirement } = payload
      state.semesters[semesterNumber].splice(row, 1, requirement)
    },

    removeRequirement: (state, { payload }) => {
      const { semesterNumber, row } = payload
      state.semesters[semesterNumber].splice(row, 1)
    },

    initPlan: (state, { payload }) => {
      const { requirements, idToRequirement } = payload
      state.idToRequirement = idToRequirement
      requirements.forEach((requirement) => {
        const { initSemester, initRow } = requirement
        state.semesters[initSemester].splice(initRow, 1, requirement)
      })

      // remove null (placeholder) requirements
      // state.semesters = state.semesters.map((semester) => semester.filter((requirement) => requirement !== null))

      state.isInit = true
    },

    moveRequirement: (state, { payload }) => {
      const { destSemesterNumber, destRow, requirementId } = payload
      const draggedRequirement: IDynRequirement = state.idToRequirement[requirementId]

      const newSemesters = state.semesters.map((semester, semesterNumber) => {
        // replace dragged requirement with a placeholder requirement
        let newSemester = semester.map((requirement) => {
          if (requirement?._id === requirementId) {
            return {
              _id: `${Math.random()}`,
              isPlaceholder: true,
              isRemoveOnRender: false,
            }
          }
          return requirement
        })

        // if this is destination semester, insert requirement
        if (semesterNumber === destSemesterNumber) {
          if (newSemester[destRow]?.isPlaceholder) {
            // destRow is a placeholder, set isRemoveOnRender to true
            // @ts-ignore
            newSemester[destRow].isRemoveOnRender = true
            newSemester = [...newSemester.slice(0, destRow), draggedRequirement, ...newSemester.slice(destRow)]
          } else if (destRow > 0 && newSemester[destRow - 1]?.isPlaceholder) {
            // the requirement 1 row below is a placeholder, set its isRemoveOnRender to true
            // @ts-ignore
            newSemester[destRow - 1].isRemoveOnRender = true

            // insert draggedRequirement to 1 after destRow
            newSemester = [...newSemester.slice(0, destRow + 1), draggedRequirement, ...newSemester.slice(destRow + 1)]
          } else {
            newSemester = [...newSemester.slice(0, destRow), draggedRequirement, ...newSemester.slice(destRow)]
          }
        }
        return newSemester
      })

      state.semesters = newSemesters
    },
  },
})

export const { addRequirement, initPlan, moveRequirement, removeRequirement } = planSlice.actions

export default planSlice.reducer
