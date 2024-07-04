import { createSlice } from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    authorization_token: "",
    device_token: [],
  },
  reducers: {
    addAuthorizationToken: (state, action) => {
      state.authorization_token = action.payload
    },
    addDeviceToken: (state, action) => {
      state.device_token = action.payload
    },
    removeAuthorizationToken: (state) => {
      state.authorization_token = ""
    },
    removeDeviceToken: (state, action) => {
      var index = state.authorization_token.indexOf(action.payload.device_token)
      state.authorization_token.splice(state.authorization_token, index)
    },
  },
})
// Action creators are generated for each case reducer function
export const { addAuthorizationToken, addDeviceToken, removeAuthorizationToken, removeDeviceToken } = tokenSlice.actions
export default tokenSlice.reducer