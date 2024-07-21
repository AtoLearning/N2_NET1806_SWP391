import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import './FilterSearchStyle.css';

const baseURL = "http://localhost:8080/api/v1/guest/categories";

export default function FilterSearch({onCateChange, onPostTypeChange}) {
    const [categories, setCategories] = useState([]);

    const getAllCategories = async () => {
        try {
            const response = await axios.get(baseURL, {withCredentials: true});
            if (response.status === 200) {
                setCategories(response.data.obj);
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    const handleCategoryChange = (cateId) => {
        const selectedCateObj = categories.find(category => category.cateId === parseInt(cateId));
        onCateChange(cateId, selectedCateObj?.cateName || '');
    };

    const handlePostTypeChange = (type) => {
        onPostTypeChange(type !== null ? type : "");
    };

    return (
        <div className="filter-container">
            <div className="filter-category">
                <h3>Category</h3>
                <ul>
                    <li onClick={() => handleCategoryChange("")}>All</li>
                    {categories.map((category, index) => (
                        <li key={index} onClick={() => handleCategoryChange(category.cateId)}>
                            {category.cateName}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="filter-category">
                <h3>Post&apos;s Type</h3>
                <ul>
                    <li onClick={() => handlePostTypeChange("")}>All</li>
                    <li
                        onClick={() => handlePostTypeChange('sell')}
                    >
                        Sell post
                    </li>
                    <li
                        onClick={() => handlePostTypeChange('exchange')}
                    >
                        Exchange post
                    </li>
                </ul>
            </div>
        </div>
    );
}
FilterSearch.propTypes = {
    onCateChange: PropTypes.func.isRequired,
    onPostTypeChange: PropTypes.func.isRequired
};
