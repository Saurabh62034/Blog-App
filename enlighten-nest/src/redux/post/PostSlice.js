import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPost: null,
    postArray: [],
    currentIndex: null,
}

const postSlice = createSlice({
    name: 'currentPost',
    initialState,
    reducers: {
        setPost: (state, action)=>{
            console.log("post slice = ",action.payload.post)
            state.currentPost = action.payload.post;
            state.postArray = action.payload.postArray;
            state.currentIndex = action.payload.postIndex;
        }
    }
})
export const {setPost} = postSlice.actions;
export default postSlice.reducer;