import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getData, storeData } from "../storageUtilis";

export const fetchStory = createAsyncThunk('story/fetchStory', async () => {
    const response = await axios.get('https://shortstories-api.onrender.com/stories');
    return response.data;
});

const storySlice = createSlice({
    name: 'stories',
    initialState: {
        stories: [],
        error: null,
        status: 'idle',
        selectedStory: null,
        readStories: [],
        bookmarks: [],
    },
    reducers: {
        selectStory: (state, action) => {
            state.selectedStory = action.payload
        },
        clearSelectedStory: (state) => {
            state.selectedStory = null;
        },
        markAsRead: (state, action) => {
            if (!state.readStories.includes(action.payload)) {
                state.readStories.push(action.payload);
                storeData('readStory', state.readStories)
            }
        },
        toggleBookmark: (state, action) => {
            if(state.bookmarks.includes(action.payload)) {
                state.bookmarks = state.bookmarks.filter(bookmark => bookmark !== action.payload)
            } else {
                state.bookmarks.push(action.payload);
            }
            storeData('bookmarks', state.bookmarks);
        },
        setInitialData: (state, action) => {
            state.readStories = action.payload.readStories || [];
            state.bookmarks = action.payload.bookmarks || [];
        },
    },
    extraReducers: (builders) => {
        builders.addCase(fetchStory.pending, (state) => {
            state.status = 'loading';
        }).addCase(fetchStory.fulfilled, (state, action) => {
            state.status = 'success';
            state.stories = action.payload;
        }).addCase(fetchStory.rejected, (state, action) => {
            state.status = 'failed',
            state.error = action.error.message;
        })
    }
})

export const { selectStory, clearSelectedStory, markAsRead, toggleBookmark, setInitialData } = storySlice.actions
export default storySlice.reducer;