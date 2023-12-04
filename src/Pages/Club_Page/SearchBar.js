import React, {useState } from 'react';

const SearchBar = ({ handleSearch }) => {
    const[searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        handleSearch(e.target.value);
    };

    return (
        <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
        />
    )
}

export default SearchBar;