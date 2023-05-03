import { getBlogs, updateBlogApi } from "./blogsAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    blogs: [],
    isLoading: false,
    isError: false,
    error: "",
};

/*
 async thunk function for fetching all blogs applying the sort and the filter and entry to redux store 
 with the help of extraReducer
*/
export const fetchBlogs = createAsyncThunk(
    "blogs/fetchBlogs",
    async ({ sortBy, filter }) => {
        const blogs = await getBlogs({ sortBy, filter });
        return blogs;
    }
);

/*
 async thunk function for updating like and save information of a blog and entry to redux store 
 with the help of extraReducer
*/
export const updateBlog = createAsyncThunk(
    "updateBlog/updateBlog",
    async ({ id, dataToUpdate }) => {
        const blog = await updateBlogApi({ id, dataToUpdate });
        return blog;
    }
);

const blogsSlice = createSlice({
    name: "blogs",
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.blogs = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.isLoading = false;
                state.blogs = [];
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.blogs.splice(state.blogs.findIndex(blog => blog?.id === action.payload?.id), 1, action.payload);
            });
    },
});

export default blogsSlice.reducer;
