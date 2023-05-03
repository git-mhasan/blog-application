import axios from "../../utils/axios";

//API for fetching all blogs with sort and filter from server
export const getBlogs = async ({ sortBy, filter }) => {

    // Query string for sort and filter
    let queryString = "";

    if (sortBy === "default") {
        queryString = "";
    } else if (sortBy === "newest") {
        queryString = "?_sort=createdAt&_order=desc";
    } else if (sortBy === "most_liked") {
        queryString = "?_sort=likes&_order=desc";
    } else {
        queryString = "";
    }

    if (filter === "all") {
        queryString += "";
    } else if (filter === "saved") {
        queryString ?
            queryString += `&isSaved=${true}` : queryString = `?isSaved=${true}`;
    } else {
        queryString += "";
    }

    const response = await axios.get(`/blogs${queryString}`);

    return response.data;
};


//API for updating like and save information to the server.
export const updateBlogApi = async ({ id, dataToUpdate }) => {

    const response = await axios
        .patch(`/blogs/${id}`, dataToUpdate);

    return response.data;
};