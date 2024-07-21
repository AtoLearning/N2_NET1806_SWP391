import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import './SearchBox.css';
const error_init = {
    query_err: '',
}
export default function SearchBox() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const [errors, setErrors] = useState(error_init);

    const handleSearch = () => {
        if (validateForm()) {
            navigate(`/search?searchValue=${query}`);
        }
    };
    const validateForm = () => {
        let isValid = true;
        let errors = { ...error_init };

        if (!(1 <= query.trim().length && query.trim().length <= 30)) {
            errors.query_err = 'Query too long or short';
            isValid = false;
        }
        const specialCharPattern = /[^a-zA-Z0-9 ]/g;
        if (specialCharPattern.test(query.trim())) {
            errors.query_err = 'Query contains special characters';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    }
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

