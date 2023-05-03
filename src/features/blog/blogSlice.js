import { updateBlog } from "../blogs/blogsSlice";
import { getBlog } from "./blogAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    blog: {},
    isLoading: false,
    isError: false,
    error: "",
};

/*
 async thunk function for fetching individual blog and entry to redux store 
 with the help of extraReducer
*/
export const fetchBlog = createAsyncThunk("blog/fetchBlog", async (id) => {
    const blog = await getBlog(id);
    return blog;
});

const blogSlice = createSlice({
    name: "blog",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlog.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.blog = action.payload;
            })
            .addCase(fetchBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.blog = {};
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.blog = {
                    ...state.blog,
                    likes: action.payload.likes,
                    isSaved: action.payload.isSaved
                };

            });
    },
});

export default blogSlice.reducer;
