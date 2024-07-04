import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const settingSlice = createSlice({
    name: "post",
    initialState: {
      isPublicPost:0,
      isCommentTurnOff:0
    },
    reducers: {
        resetIsPublicPost: (state) => {
            state.isPublicPost = 0
        },
        resetIsCommentTurnOff: (state) => {
            state.isCommentTurnOff = 0
        },
        setIsPublicPost: (state) => {
            state.isPublicPost = 1
        },
       setIsCommentTurnOff: (state) => {
            state.isCommentTurnOff = 1
        }
    },
    extraReducers: {

    }
})

export const {
    resetIsPublicPost,
    resetIsCommentTurnOff,
    setIsPublicPost,
    setIsCommentTurnOff,
} = settingSlice.actions

export default settingSlice.reducer;