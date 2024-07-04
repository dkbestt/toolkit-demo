import { createSlice } from '@reduxjs/toolkit'

export const forgotPasswordSlice = createSlice({
  name: 'register',
  initialState: {
    choose_method: null,
    reset_password: null,
    validate_yourSelf: null,
    type: "",
    mobile: "",
    email: "",
    country_code: "",
    otp: "",
  },
  reducers: {
    setChooseMethod: (state) => {
      state.choose_method = "Reset Your passowrd using the method used at time of Registration"
    },
    setResetPassword: (state) => {
      state.reset_password = "Reset Your password"
    },
    setValidateYourself: (state) => {
      state.validate_yourSelf = "Validate Yourself"
    },
    addForPassMobileData: (state, action) => {
      state.type = action.payload.type
      state.mobile = action.payload.mobile
      state.country_code = action.payload.country_code
    },
    addForPassEmailData: (state, action) => {
      state.type = action.payload.type
      state.email = action.payload.email
    },
    addForPassOtp: (state, action) => {
      state.otp = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setChooseMethod, setResetPassword, setValidateYourself, addForPassMobileData, addForPassEmailData, addForPassOtp } = forgotPasswordSlice.actions
export default forgotPasswordSlice.reducer