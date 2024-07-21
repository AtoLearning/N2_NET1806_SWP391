import React from 'react';
import './MorViewPostStyle.css';

const MorViewPost = ({ onSearchChange, onSortChange }) => {
    const handleKeyDown = (e, type) => {
        if (e.key === 'Enter') {
            onSearchChange(e.target.value, type);
        }
    };

    return (
        <div className="MVP-search-container">
            <div className="MVP-search-item">
                <label htmlFor="searchGmail">Search gmail</label>
                <input 
                    id="searchGmail" 
                    type="text" 
                    placeholder="Search gmail" 
                    onKeyDown={e => handleKeyDown(e, 'email')} 
                />
            </div>
            <div className="MVP-search-item">
                <label htmlFor="searchType">Status</label>
                <select id="searchType" onChange={e => onSortChange(e.target.value, 'type')}>
                    <option value="">Select Status</option>
                    <option value="Approving">Approving</option>
                    <option value="Approved">Approved</option>
                    <option value="Transacted">Transacted</option>
                    <option value="Reject">Reject</option>
                </select>
            </div>
            <div className="MVP-search-item">
                <label htmlFor="searchDate">Created Date</label>
                <select id="searchDate" onChange={e => onSortChange(e.target.value, 'date')}>
                    <option value="">Select Order</option>
                    <option value="newest">From newest date to oldest date</option>
                    <option value="oldest">From oldest date to newest date</option>
                </select>
            </div>
        </div>
    );
};

export default MorViewPost;
