import React from 'react'
import { Link } from "react-router-dom"
import { FaSearch } from "react-icons/fa";
import './SearchBox.css'

export default function Search() {
    return (
        <div className="header_search">
            <input className="search_text" placeholder="Search..." required />
            <Link to="/SearchPage" title="SearchResult">
            <button className="search_btn" title="Search"><FaSearch /></button>
            </Link>
        </div>
    )
}
