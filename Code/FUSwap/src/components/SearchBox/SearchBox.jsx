import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import './SearchBox.css';
import {useNavigate} from "react-router-dom";

export default function Search() {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        if (keyword.trim() !== '') {
            navigate(`/SearchPage?searchValue=${keyword}`);
            setKeyword(''); // Clear the input after searching
        }
    };
    const handleInvalid = (event) => {
        event.preventDefault();
        // Custom alert message
        // alert("Please enter a keyword to search");
    }

    return (
        <form className="header_search" onSubmit={handleSearch}>
            <input
                className="search_text"
                placeholder="Search..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                required
                onInvalid={handleInvalid}
            />
            <button type="submit" className="search_btn" title="Search">
                <FaSearch />
            </button>
        </form>
    );
}
