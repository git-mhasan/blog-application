import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterSelected, sortOptionSelected } from '../features/filter/filterSlice';

const SideMenu = () => {
    const dispatch = useDispatch();

    const { sortBy, filter } = useSelector((state) => state.filter);

    const [filterInput, setFilterInput] = useState({
        sortBy: sortBy,
        filter: filter,
    })

    const handleSortChange = (event) => {
        setFilterInput({ ...filterInput, sortBy: event.target.value });
        dispatch(sortOptionSelected(event.target.value));
    }

    const handleFilterChange = (event) => {
        setFilterInput({ ...filterInput, filter: event.target.value });
        dispatch(filterSelected(event.target.value));
    }

    return (
        <aside>
            <div className="sidebar-items">
                <div className="sidebar-content">
                    <h4>Sort</h4>
                    <select name="sort" id="lws-sort" className="w-full max-w-[150px] border-2 rounded-md text-gray-500"
                        value={filterInput.sortBy}
                        onChange={handleSortChange}
                    >
                        <option value="default">Default</option>
                        <option value="newest">Newest</option>
                        <option value="most_liked">Most Liked</option>
                    </select>
                </div>
                <div className="sidebar-content">
                    <h4>Filter</h4>
                    <div className="radio-group">
                        {/* <!-- handle filter on button click --> */}
                        <div>
                            <input type="radio" name="filter" id="lws-all" value="all" className="radio"
                                onChange={handleFilterChange} checked={filterInput.filter === 'all'} />
                            <label htmlFor="lws-all">All</label>
                        </div>
                        <div>
                            <input type="radio" name="filter" id="lws-saved" value="saved" className="radio"
                                onChange={handleFilterChange} checked={filterInput.filter === 'saved'} />
                            <label htmlFor="lws-saved">Saved</label>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SideMenu;