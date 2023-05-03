import axios from "../../utils/axios";

//API for fetching a single blog with specific id from server
export const getBlog = async (id) => {
    const response = await axios.get(`/blogs/${id}`);

    return response.data;
};
