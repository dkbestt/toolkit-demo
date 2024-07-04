import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const searchSlice = createSlice({
    name: "post",
    initialState: {
        search_users: [],
        tag_users: [],
        tag_users_ids: [],
        mention_users: [],
    },
    reducers: {
        removeSerachData: (state, action) => {
            state.search_users = []
        },
        addSerachData: (state, action) => {
            state.search_users = action.payload
        },
        addTagData: (state, action) => {
            state.tag_users = action.payload;
        },
        removeTagData: (state, action) => {
            state.tag_users = []
        },
        addMentionData: (state, action) => {
            state.mention_users = action.payload
        },
        removeMentionData: (state, action) => {
            state.mention_users = []

        },
    },
    extraReducers: {

    }
})

export const {
    removeSerachData,
    addSerachData,
    removeTagData,
    addTagData,
    addMentionData,
    removeMentionData

} = searchSlice.actions

export default searchSlice.reducer;