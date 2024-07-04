import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../services/apiService";
import { addAuthorizationToken, addDeviceToken } from "./tokenSlice";

const user = JSON.parse(localStorage.getItem("user"))

export const login = createAsyncThunk("user/login",
    async (data, thunkAPI) => {
        try {
            const response = await apiService.Login(data)
            if (response.success !== 1) {
                return response
            }
            thunkAPI.dispatch(addAuthorizationToken(response.data.token))
            thunkAPI.dispatch(addDeviceToken(response.data.user.device_token))
            return response;
        } catch (error) {
            // eslint-disable-next-line
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue()
        }
    }
)

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    // initialState:{
    //     user:[],
    //     isLoggedIn: false
    // },
    reducers: {
        // all users settings
        // start Notification settings -----------------------------------------------------------------------
        pauseAllNotiOnOff: (state, { payload }) => {
            state.user.user_setting = { ...state.user.user_setting, is_pause_notification: payload }
        },
        profileViewNotiOnOff: (state, { payload }) => {
            state.user.user_setting = { ...state.user.user_setting, is_profile_view_notify: payload }
        },
        followReqNotiOnOff: (state, { payload }) => {
            state.user.user_setting = { ...state.user.user_setting, is_follow_request_notify: payload }
        },
        acceptFollowReqNotiOnOff: (state, { payload }) => {
            state.user.user_setting = { ...state.user.user_setting, is_accept_follow_request_notify: payload }
        },

        postLikeNotiOnOff: (state, { payload }) => {
            state.user.user_setting = { ...state.user.user_setting, is_post_like_notify: payload }
        },
        postCommentNotiOnOff: (state, { payload }) => {
            state.user.user_setting = { ...state.user.user_setting, is_post_comment_notify: payload }
        },
        tagPostLikeCommentNotiOnOff: (state, { payload }) => {
            state.user.user_setting = { ...state.user.user_setting, is_tagged_post_like_comment_notify: payload }
        },
        tagPostNotiOnOff: (state, { payload }) => {
            state.user.user_setting = { ...state.user.user_setting, is_tagged_post_notify: payload }
        },
        mentionPostNotiOnOff: (state, { payload }) => {
            state.user.user_setting = { ...state.user.user_setting, is_mention_post_notify: payload }
        },
        // End Notification settings ----------------------------------------------------------------------------

        // Start Privacy settings -------------------------------------------------------------------------------
        profilePhotoPrivacy: (state, { payload }) => {
            state.user.user_setting = { ...state.user.user_setting, who_see_profile_photo: payload }
        },
        aboutPrivacy: (state, { payload }) => {
            state.user.user_setting = { ...state.user.user_setting, who_see_about: payload }
        },
        lastSeenPrivacy: (state, { payload }) => {
            state.user.user_setting = { ...state.user.user_setting, who_see_last_seen: payload }
        },
        tagPrivacy: (state, { payload }) => {
            state.user.user_setting = { ...state.user.user_setting, who_can_tag: payload }
        },
        mentionPrivacy: (state, { payload }) => {
            state.user.user_setting = { ...state.user.user_setting, who_can_mention: payload }
        },
        storyViewPrivacy: (state, { payload }) => {
            state.user.user_setting = { ...state.user.user_setting, story_view: payload }
        },
        storyDownloadPrivacy: (state, { payload }) => {
            state.user.user_setting = { ...state.user.user_setting, story_download: payload }
        },
        // End Privacy settings ---------------------------------------------------------------------------------

        blockUserRemove: (state, { payload }) => {
            state.user.block_user = state.user.block_user.filter(({ id }) => id !== payload)
        },
        // start Device list settings ---------------------------------------------------------------------------
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.user = action.payload
        },
        [login.rejected]: (state, action) => {
            state.isLoggedIn = false
            state.user = null
        }
    }
})
export const {
    pauseAllNotiOnOff,
    profileViewNotiOnOff,
    followReqNotiOnOff,
    acceptFollowReqNotiOnOff,
    postLikeNotiOnOff,
    postCommentNotiOnOff,
    tagPostLikeCommentNotiOnOff,
    tagPostNotiOnOff,
    mentionPostNotiOnOff,
    profilePhotoPrivacy,
    aboutPrivacy,
    lastSeenPrivacy,
    tagPrivacy,
    mentionPrivacy,
    storyViewPrivacy,
    storyDownloadPrivacy,
    blockUserRemove,
} = loginSlice.actions;

export default loginSlice.reducer
