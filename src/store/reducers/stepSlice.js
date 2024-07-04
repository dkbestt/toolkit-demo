import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'step',
  initialState: {
    value: 1,
  },
  reducers: {
    next: (state) => {
      state.value += 1
      // console.log(state.value)
    },
    prev: (state) => {
      state.value -= 1
      // console.log(state.value)
    },
    nextWithMutiStep: (state, action) => {
      state.value += action.payload
    },
    setStep: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { next, prev, nextWithMutiStep, setStep } = counterSlice.actions

export default counterSlice.reducer