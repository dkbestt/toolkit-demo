import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'register',
  initialState: {
    user_name: "",
    first_name: "",
    last_name: "",
    email: "",
    type: "",
    mobile: "",
    otp: "",
    password: "",
    country_code: ""
  },
  reducers: {
    addUserName: (state, action) => {
      state.user_name = action.payload
    },
    addFullName: (state, action) => {
      state.first_name = action.payload.first_name
      state.last_name = action.payload.last_name
    },
    addRegistrationMobileData: (state, action) => {
      state.type = action.payload.type
      state.mobile = action.payload.mobile
      state.country_code = "+" + action.payload.dialCode
    },
    addRegistrationEmailData: (state, action) => {
      state.type = action.payload.type
      state.email = action.payload.email
    },
    addOtp: (state, action) => {
      state.otp = action.payload
    },
    addPassword: (state, action) => {
      state.password = action.payload
    },
    updateUserName: (state, action) => {
      state.user_name = action.payload.user_name
    },
  },
})

// Action creators are generated for each case reducer function
export const { addUserName, addFullName, addRegistrationMobileData, addRegistrationEmailData, addOtp, updateUserName, addPassword } = userSlice.actions
export default userSlice.reducer