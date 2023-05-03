const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    sortBy: 'default',
    filter: 'all',
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        sortOptionSelected: (state, action) => {
            state.sortBy = action.payload;
        },
        filterSelected: (state, action) => {
            state.filter = action.payload;
            console.log(action.payload);
        }

    },
});

export default filterSlice.reducer;
export const { sortOptionSelected, filterSelected } = filterSlice.actions;
