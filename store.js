import { configureStore } from "@reduxjs/toolkit";
import storySlice from './features/storiesSlice'

const store = configureStore({
    reducer: {
        story: storySlice
    }
})

export default store;