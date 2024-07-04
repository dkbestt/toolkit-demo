import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../services/apiService";

export const getAllStory = createAsyncThunk('get/story',
    async () => {
        try {
            const response = await apiService.GetStory()
            // console.log(response.data, 'from thunk');
            return response.data
        } catch (error) {
            console.log(error, 'errr');
        }
    })


export const storySlice = createSlice({
    name: "story",
    initialState: {
        mystory: [],
        otherstory: []
    },
    reducers: {
        removeStoryData: (state, action) => {
            state.mystory = []
            state.otherstory = []
        }
    },
    extraReducers: {
        [getAllStory.fulfilled]: (state, { payload }) => {
            state.mystory = [payload.my_story]
            state.otherstory = [...state.otherstory, ...payload.story.recent, ...payload.story.viewed]
        },
        [getAllStory.rejected]: (state, { payload }) => {
            state.mystory = null
            state.otherstory = null
        },
    }
})

export const { removeStoryData } = storySlice.actions
export default storySlice.reducer