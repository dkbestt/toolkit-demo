import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const otherUserProfileSlice = createSlice({
    name: "other-user-profile",
    initialState: {
        otherUser: []
    },
    reducers: {
        emptyOtherUserData: (state, action) => {
            state.otherUser = null
        },
        addOtherUserData: (state, { payload }) => {
            state.otherUser = payload
        },
        followUnfollowUserFromOtherUserProfile: (state, { payload }) => {
            state.otherUser = { ...state.otherUser, is_follow: payload.is_follow }
        },
        blockUnblockUser: (state, { payload }) => {
            state.otherUser = { ...state.otherUser, is_block: payload.type }
        }
    }
})


export const {
    emptyOtherUserData,
    addOtherUserData,
    followUnfollowUserFromOtherUserProfile,
    blockUnblockUser
} = otherUserProfileSlice.actions;

export default otherUserProfileSlice.reducer;