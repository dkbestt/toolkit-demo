import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../services/apiService";

export const getAllPost = createAsyncThunk('post',
    async (id) => {
        try {
            const response = await apiService.GetAllPost(id)
            return response.data
        } catch (err) {
            throw new Error(err);
        }
    }
)

export const getMyPost = createAsyncThunk('mypost',
    async (data) => {
        try {
            const response = await apiService.GetPost(data)
            if (response.success === 0) {
                return response.data = []
            }
            return response.data
        } catch (err) {
            throw new Error(err);
        }
    }
)

export const getMyTagPost = createAsyncThunk('tagpost',
    async (data) => {
        try {
            const response = await apiService.GetPost(data)
            if (response.success === 0) {
                return response.data = []
            }
            return response.data
        } catch (err) {
            throw new Error(err);
        }
    }
)

export const getMySavePost = createAsyncThunk('savepost',
    async (data) => {
        try {
            const response = await apiService.GetPost(data)
            if (response.success === 0) {
                return response.data = []
            }
            return response.data
        } catch (err) {
            throw new Error(err);
        }
    }
)

export const getOtherUserPost = createAsyncThunk('otherpost',
    async (data) => {
        try {
            const response = await apiService.GetPost(data)
            if (response.success === 0) {
                return response.data = []
            }
            return response.data
        } catch (err) {
            throw new Error(err);
        }
    }
)

export const postSlice = createSlice({
    name: "post",
    initialState: {
        post: [],
        mypost: [],
        tagpost: [],
        savepost: [],
        otherpost: [],
        post_media: [],
        location: null
    },
    reducers: {
        removePostData: (state, action) => {
            state.post = []
        },
        removeMyPostData: (state, action) => {
            state.mypost = []
        },
        removeMyTagPostData: (state, action) => {
            state.tagpost = []
        },
        removeMySavePostData: (state, action) => {
            state.savepost = []
        },
        removeOtherPostData: (state, action) => {
            state.otherpost = []
        },
        removeCreatePostData: (state, action) => {
            state.post_media = []
        },
        resetLocation: (state) => {
            state.location = null
        },
        setLocation: (state, action) => {
            state.location = action.payload
        },
        deleteMyPost: (state, { payload }) => {
            if (payload.from === "post") {
                state.post = state.post.filter(({ id }) => id !== payload.id);
            } else if (payload.from === "mypost") {
                state.mypost = state.mypost.filter(({ id }) => id !== payload.id);
            } else if (payload.from === "tagpost") {
                state.tagpost = state.tagpost.filter(({ id }) => id !== payload.id);
            } else if (payload.from === "savepost") {
                state.savepost = state.savepost.filter(({ id }) => id !== payload.id);
            }
        },
        commentONOFF: (state, { payload }) => {
            if (payload.from === "post") {
                state.post = state.post.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, turn_off_comment: payload.turn_off_comment }
                    }
                    return obj;
                });

            } else if (payload.from === 'mypost') {
                state.mypost = state.mypost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, turn_off_comment: payload.turn_off_comment }
                    }
                    return obj;
                });

            } else if (payload.from === 'tagpost') {
                state.tagpost = state.tagpost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, turn_off_comment: payload.turn_off_comment }
                    }
                    return obj;
                });

            } else if (payload.from === 'savepost') {
                state.savepost = state.savepost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, turn_off_comment: payload.turn_off_comment }
                    }
                    return obj;
                });
            }
        },
        postNotiONOFF: (state, { payload }) => {
            if (payload.from === "post") {
                state.post = state.post.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, turn_on_post_notification: payload.turn_on_notification }
                    }
                    return obj;
                });

            } else if (payload.from === 'mypost') {
                state.mypost = state.mypost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, turn_on_post_notification: payload.turn_on_notification }
                    }
                    return obj;
                });

            } else if (payload.from === 'tagpost') {
                state.tagpost = state.tagpost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, turn_on_post_notification: payload.turn_on_notification }
                    }
                    return obj;
                });

            } else if (payload.from === 'savepost') {
                state.savepost = state.savepost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, turn_on_post_notification: payload.turn_on_notification }
                    }
                    return obj;
                });
            } else if (payload.from === 'otherpost') {
                state.otherpost = state.otherpost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, turn_on_post_notification: payload.turn_on_notification }
                    }
                    return obj;
                });
            }
        },
        changePostPrivacy: (state, { payload }) => {
            if (payload.from === "post") {
                state.post = state.post.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, is_public: payload.is_public }
                    }
                    return obj;
                });

            } else if (payload.from === 'mypost') {
                console.log(payload, 'p');
                state.mypost = state.mypost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, is_public: payload.is_public }
                    }
                    return obj;
                });

            } else if (payload.from === 'tagpost') {
                state.tagpost = state.tagpost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, is_public: payload.is_public }
                    }
                    return obj;
                });

            } else if (payload.from === 'savepost') {
                state.savepost = state.savepost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, is_public: payload.is_public }
                    }
                    return obj;
                });
            }
        },
        addLatestComment: (state, { payload }) => {
            if (payload.from === "post") {
                state.post = state.post.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, latest_comment: payload, comments_count: (obj.comments_count + payload.countComment) }
                    }
                    return obj;
                });

            } else if (payload.from === 'mypost') {
                state.mypost = state.mypost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, latest_comment: payload, comments_count: (obj.comments_count + payload.countComment) }
                    }
                    return obj;
                });
            } else if (payload.from === 'tagpost') {
                state.tagpost = state.tagpost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, latest_comment: payload, comments_count: (obj.comments_count + payload.countComment) }
                    }
                    return obj;
                });
            } else if (payload.from === 'savepost') {
                state.savepost = state.savepost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, latest_comment: payload, comments_count: (obj.comments_count + payload.countComment) }
                    }
                    return obj;
                });
            } else if (payload.from === 'otherpost') {
                console.log(payload, 'comment p');
                state.otherpost = state.otherpost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, latest_comment: payload, comments_count: (obj.comments_count + payload.countComment) }
                    }
                    return obj;
                });
            }

        },
        postSaveUnsave: (state, { payload }) => {
            if (payload.from === "post") {
                state.post = state.post.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, is_save: payload.type }
                    }
                    return obj;
                });

            } else if (payload.from === 'mypost') {
                state.mypost = state.mypost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, is_save: payload.type }
                    }
                    return obj;
                });

            } else if (payload.from === 'tagpost') {
                state.tagpost = state.tagpost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, is_save: payload.type }
                    }
                    return obj;
                });

            } else if (payload.from === 'savepost') {
                state.savepost = state.savepost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, is_save: payload.type }
                    }
                    return obj;
                });
            } else if (payload.from === 'otherpost') {
                state.otherpost = state.otherpost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, is_save: payload.type }
                    }
                    return obj;
                });
            }
        },
        postLikeUnlike: (state, { payload }) => {
            if (payload.from === "post") {
                state.post = state.post.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, is_like: payload.type, likes_count: (obj.likes_count + payload.countLike) }
                    }
                    return obj;
                });

            } else if (payload.from === 'mypost') {
                state.mypost = state.mypost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, is_like: payload.type, likes_count: (obj.likes_count + payload.countLike) }
                    }
                    return obj;
                });

            } else if (payload.from === 'tagpost') {
                state.tagpost = state.tagpost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, is_like: payload.type, likes_count: (obj.likes_count + payload.countLike) }
                    }
                    return obj;
                });

            } else if (payload.from === 'savepost') {
                state.savepost = state.savepost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, is_like: payload.type, likes_count: (obj.likes_count + payload.countLike) }
                    }
                    return obj;
                });
            } else if (payload.from === 'otherpost') {
                state.otherpost = state.otherpost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, is_like: payload.type, likes_count: (obj.likes_count + payload.countLike) }
                    }
                    return obj;
                });
            }
        },
        addCreatePostData: (state, action) => {
            console.log(action.payload, 'add create post');
            state.post_media = action.payload;
            console.log(state.post_media);
        },
        decreaseCountComment: (state, { payload }) => {
            if (payload.from === "post") {
                state.post = state.post.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, comments_count: (obj.comments_count - 1) }
                    }
                    return obj;
                });

            } else if (payload.from === 'mypost') {
                state.mypost = state.mypost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, comments_count: (obj.comments_count - 1) }
                    }
                    return obj;
                });

            } else if (payload.from === 'tagpost') {
                state.tagpost = state.tagpost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, comments_count: (obj.comments_count - 1) }
                    }
                    return obj;
                });

            } else if (payload.from === 'savepost') {
                state.savepost = state.savepost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, comments_count: (obj.comments_count - 1) }
                    }
                    return obj;
                });
            }
        },
        increaseCountComment: (state, { payload }) => {
            if (payload.from === "post") {
                state.post = state.post.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, comments_count: (obj.comments_count + 1) }
                    }
                    return obj;
                });

            } else if (payload.from === 'mypost') {
                state.mypost = state.mypost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, comments_count: (obj.comments_count + 1) }
                    }
                    return obj;
                });

            } else if (payload.from === 'tagpost') {
                state.tagpost = state.tagpost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, comments_count: (obj.comments_count + 1) }
                    }
                    return obj;
                });

            } else if (payload.from === 'savepost') {
                state.savepost = state.savepost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, comments_count: (obj.comments_count + 1) }
                    }
                    return obj;
                });
            }
        },
        followUnfollowUserFromPost: (state, { payload }) => {
            if (payload.from === "post") {
                state.post = state.post.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, is_follow: payload.is_follow }
                    }
                    return obj;
                });

            } else if (payload.from === 'tagpost') {
                state.tagpost = state.tagpost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, is_follow: payload.is_follow }
                    }
                    return obj;
                });

            } else if (payload.from === 'savepost') {
                state.savepost = state.savepost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, is_follow: payload.is_follow }
                    }
                    return obj;
                });
            } else if (payload.from === 'otherpost') {
                state.otherpost = state.otherpost.map((obj) => {
                    if (obj.id === payload.post_id) {
                        return { ...obj, is_follow: payload.is_follow }
                    }
                    return obj;
                });
            }
        }
    },
    extraReducers: {
        [getAllPost.fulfilled]: (state, { payload }) => {
            state.post = [...state.post, ...payload];
        },
        [getAllPost.rejected]: (state, { payload }) => {
            state.post = null
        },

        [getMyPost.fulfilled]: (state, { payload }) => {
            state.mypost = [...state.mypost, ...payload];
        },
        [getMyPost.rejected]: (state, { payload }) => {
            state.mypost = null
        },

        [getMyTagPost.fulfilled]: (state, { payload }) => {
            state.tagpost = [...state.tagpost, ...payload];
        },
        [getMyTagPost.rejected]: (state, { payload }) => {
            state.tagpost = null
        },

        [getMySavePost.fulfilled]: (state, { payload }) => {
            state.savepost = [...state.savepost, ...payload];
        },
        [getMySavePost.rejected]: (state, { payload }) => {
            state.savepost = null
        },
        [getOtherUserPost.fulfilled]: (state, { payload }) => {
            state.otherpost = [...state.otherpost, ...payload];
        },
        [getOtherUserPost.rejected]: (state, { payload }) => {
            state.otherpost = null
        },
    }
})

export const {
    removeMyPostData,
    removePostData,
    removeMySavePostData,
    removeOtherPostData,
    removeMyTagPostData,
    removeLatestComment,
    deleteMyPost,
    commentONOFF,
    postNotiONOFF,
    changePostPrivacy,
    addLatestComment,
    postSaveUnsave,
    postLikeUnlike,
    addCountPostLikeUnlike,
    decreaseCountComment,
    increaseCountComment,
    followUnfollowUserFromPost,
    removeCreatePostData,
    addCreatePostData,
    resetLocation,
    setLocation
} = postSlice.actions

export default postSlice.reducer;