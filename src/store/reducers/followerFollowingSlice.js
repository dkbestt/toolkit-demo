import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const followerFollowingSlice = createSlice({
    name: "follower-following",
    initialState: {
        // For login user 
        following_users: [],
        follower_users: [],
        follower_req_users: [],

        // For other user
        other_user_following_users: [],
        other_user_follower_users: [],
    },
    reducers: {
        // For login user 
        removeFollowingUsers: (state, action) => {
            state.following_users = []
        },
        removeFollowerUsers: (state, action) => {
            state.follower_users = []
        },
        removeFollowerRequestUsers: (state, action) => {
            state.follower_req_users = []
        },
        addFollowingUsers: (state, { payload }) => {
            state.following_users = payload
        },
        addFollowerUsers: (state, { payload }) => {
            state.follower_users = payload
        },
        addFollowerRequestUsers: (state, { payload }) => {
            state.follower_req_users = payload
        },
        followUnfollowUser: (state, { payload }) => {
            if (payload.from === "follower") {
                state.follower_users = state.follower_users.map((obj) => {
                    if (obj.id === payload.id) {
                        return { ...obj, is_follow: payload.is_follow }
                    }
                    return obj;
                });
            } else if (payload.from === "following") {
                state.following_users = state.following_users.map((obj) => {
                    if (obj.id === payload.id) {
                        return { ...obj, is_follow: payload.is_follow }
                    }
                    return obj;
                });
            } else if (payload.from === "otherFollower") {
                state.other_user_follower_users = state.other_user_follower_users.map((obj) => {
                    if (obj.id === payload.id) {
                        return { ...obj, is_follow: payload.is_follow }
                    }
                    return obj;
                });
            } else if (payload.from === "otherFollowing") {
                state.other_user_following_users = state.other_user_following_users.map((obj) => {
                    if (obj.id === payload.id) {
                        return { ...obj, is_follow: payload.is_follow }
                    }
                    return obj;
                });
            }
        },
        removeSingleFollowReq: (state, { payload }) => {
            state.follower_req_users = state.follower_req_users.filter(({ user_id }) => user_id !== payload.friend_id)
        },

        // For other user 
        removeOtherFollowingUsers: (state, action) => {
            state.other_user_following_users = []
        },
        removeOtherFollowerUsers: (state, action) => {
            state.other_user_follower_users = []
        },
        addOtherFollowingUsers: (state, { payload }) => {
            state.other_user_following_users = [...state.other_user_following_users, ...payload]
        },
        addOtherFollowerUsers: (state, { payload }) => {
            state.other_user_follower_users = [...state.other_user_follower_users, ...payload]
        },
    }
})


export const {
    removeFollowingUsers,
    removeFollowerUsers,
    removeFollowerRequestUsers,
    addFollowingUsers,
    addFollowerUsers,
    addFollowerRequestUsers,
    followUnfollowUser,
    removeSingleFollowReq,
    removeOtherFollowingUsers,
    removeOtherFollowerUsers,
    addOtherFollowingUsers,
    addOtherFollowerUsers,
} = followerFollowingSlice.actions;

export default followerFollowingSlice.reducer;