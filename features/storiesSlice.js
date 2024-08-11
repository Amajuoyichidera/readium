import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStory = createAsyncThunk('story/fetchStory', async () => {
    const response = await axios.get('https://shortstories-api.onrender.com/stories');
    return response.data;
});

export const fetchStoryDetails = createAsyncThunk('story/fetchStoryDetails', async (id) => {
   const response = await axios.get(`https://shortstories-api.onrender.com/stories${id}`);
   return response.data;
})

const storySlice = createSlice({
    name: 'stories',
    initialState: {
        stories: [],
        error: null,
        status: 'idle',
        selectedStory: null,
    },
    reducers: {
        clearSelectedStory: (state) => {
            state.selectedStory = null;
        }
    },
    extraReducers: (builders) => {
        builders.addCase(fetchStory.pending, (state) =>{
            state.status = 'loading';
        }).addCase(fetchStory.fulfilled, (state, action) => {
            state.status = 'success';
            state.stories = action.payload;
        }).addCase(fetchStory.rejected, (state, action) => {
            state.status = 'failed',
            state.error = action.error.message;
        }).addCase(fetchStoryDetails.pending, (state) => {
            state.status = 'loading';
        }).addCase(fetchStoryDetails.fulfilled, (state, action) => {
            state.status = 'success';
            state.selectedStory = action.payload;
        }).addCase(fetchStoryDetails.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
})

export const { clearSelectedStory } = storySlice.actions
export default storySlice.reducer