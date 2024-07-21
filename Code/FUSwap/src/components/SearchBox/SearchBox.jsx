import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import './SearchBox.css';

export default function SearchBox() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (query.trim()) {
            navigate(`/search?searchValue=${query}`);
        }
    };

    return (
        <div className="header_search">
            <input
                className="search_text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
            />
            <button className="search_btn" title="Search" onClick={handleSearch}>
                <FaSearch />
            </button>
        </div>
    );
}

