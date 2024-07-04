import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        following: 0,
        follower: 0,
        profile_view: 0,
        follower_req: 0,
        total_my_post: 0,
        total_tag_post: 0,
        total_save_post: 0,
    },
    reducers: {
        emptyState: (state, action) => {
            state.following = 0;
            state.follower = 0;
            state.profile_view = 0;
            state.follower_req = 0;
            state.total_my_post = 0;
            state.total_tag_post = 0;
            state.total_save_post = 0;
        },
        //------------------------------------------------INCREASE--------------------------------------------------
        increaseFollowing: (state, { payload }) => {
            state.following += payload
        },
        increaseFollower: (state, { payload }) => {
            state.follower += payload
        },
        increaseProfileView: (state, { payload }) => {
            state.profile_view += payload
        },
        increaseFollowerReq: (state, { payload }) => {
            state.follower_req += payload
        },
        increaseMyPost: (state, { payload }) => {
            state.total_my_post += payload
        },
        increaseTagPost: (state, { payload }) => {
            state.total_tag_post += payload
        },
        increaseSavePost: (state, { payload }) => {
            state.total_save_post += payload
        },
        //--------------------------------------------------DECREASE------------------------------------------------
        decreaseFollowing: (state, { payload }) => {
            state.following -= payload
        },
        decreaseFollower: (state, { payload }) => {
            state.follower -= payload
        },
        decreaseProfileView: (state, { payload }) => {
            state.profile_view -= payload
        },
        decreaseFollowerReq: (state, { payload }) => {
            state.follower_req -= payload
        },
        decreaseMyPost: (state, { payload }) => {
            state.total_my_post -= payload
        },
        decreaseTagPost: (state, { payload }) => {
            state.total_tag_post -= payload
        },
        decreaseSavePost: (state, { payload }) => {
            state.total_save_post -= payload
        },
    }
})


export const {
    emptyState,
    increaseFollowing,
    increaseFollower,
    increaseFollowerReq,
    increaseProfileView,
    increaseMyPost,
    increaseTagPost,
    increaseSavePost,
    decreaseFollowing,
    decreaseFollower,
    decreaseFollowerReq,
    decreaseProfileView,
    decreaseMyPost,
    decreaseTagPost,
    decreaseSavePost,
} = profileSlice.actions;

export default profileSlice.reducer;