import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../services/apiService";

export const getComment = createAsyncThunk('post/comments',
    async (data) => {
        try {
            const response = await apiService.GetComments(data)
            if (response.success === 0) {
                return response.data = []
            }
            return response.data
        } catch (error) {
            console.log(error, 'errr');
        }
    }
)

export const commentSlice = createSlice({
    name: "comment",
    initialState: {
        comment: []
    },
    reducers: {
        removeCommentData: (state, action) => {
            state.comment = []
        },
        addComment: (state, action) => {
            state.comment = [...state.comment, { ...action.payload }]
        },
        deleteComment: (state, { payload }) => {
            state.comment = state.comment.filter(({ id }) => id !== payload.id)
        },
        addCommentReply: (state, { payload }) => {
            state.comment = state.comment.map((obj) => {
                if (obj.id === payload.comment_id) {
                    return { ...obj, comment_reply: [...obj.comment_reply, payload] }
                }
                return obj
            });
        },
        deleteCommentReply: (state, { payload }) => {
            state.comment = state.comment.map((obj) => {
                if (obj.id === payload.comment_id) {
                    return { ...obj, comment_reply: obj.comment_reply.filter(({ id }) => id !== payload.id) }
                }
                return obj
            });
        }
    },

    extraReducers: {
        [getComment.fulfilled]: (state, action) => {
            state.comment = [...state.comment, ...action.payload]
        },
        [getComment.rejected]: (state, action) => {
            state.comment = null
        },
    }
})


export const { removeCommentData, deleteComment, addComment, addCommentReply, deleteCommentReply } = commentSlice.actions;

export default commentSlice.reducer;