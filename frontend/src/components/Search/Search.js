import React, { useState } from 'react';

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Pass the search term to the parent component
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleChange}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default Search;
