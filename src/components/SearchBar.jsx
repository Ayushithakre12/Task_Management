import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleChange}
                className="bg-gray-200 text-black px-4 py-2 rounded-l-md focus:outline-none"
            />
            <button
                type="submit"
                className="bg-gray-500 text-white px-4 py-2 rounded-r-md hover:bg-gray-600 focus:outline-none">
                Search
            </button>
        </form>
    );
};

export default SearchBar;
