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
        isEnabled: false,
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
                // storeData('readStory', state.readStories)
            }
        },
        toggleBookmark: (state, action) => {
            const myBook = state.bookmarks.find(bookmark => bookmark._id === action.payload._id)
            if(myBook) {
                state.bookmarks = state.bookmarks.filter(bookmark => bookmark._id !== action.payload._id)
            } else {
                state.bookmarks.push(action.payload);
            }
            storeData('bookmarks', state.bookmarks);
        },
        setInitialData: (state, action) => {
            state.readStories = action.payload.readStories || [];
            state.bookmarks = action.payload.bookmarks || [];
        },
        toggleDarkMode: (state) => {
            state.isEnabled = !state.isEnabled;
        }
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

export const { selectStory, clearSelectedStory, markAsRead, toggleBookmark, setInitialData, toggleDarkMode} = storySlice.actions
export default storySlice.reducer;