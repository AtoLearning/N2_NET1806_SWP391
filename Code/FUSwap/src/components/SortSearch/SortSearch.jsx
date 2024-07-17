import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function SortSearch({ onPriceSortChange, onDateSortChange }) {
    const [priceSort, setPriceSort] = useState("");
    const [dateSort, setDateSort] = useState("");

    const handlePriceSortChange = (event) => {
        const priceSort = event.target.value;
        setPriceSort(priceSort)
        onPriceSortChange(priceSort);
    };

    const handleDateSortChange = (event) => {
        const dateSort = event.target.value;
        setDateSort(dateSort)
        onDateSortChange(dateSort);
    };

    return (
        <div className="sort-address-container">
            <div className="sort-options">
                <select
                    className='address-select select-1'
                    value={priceSort}
                    onChange={handlePriceSortChange}
                >
                    <option value="" hidden>Sort by price</option>
                    <option value="price-asc">Price Ascending</option>
                    <option value="price-desc">Price Descending</option>
                </select>

                <select
                    className='address-select select-2'
                    value={dateSort}
                    onChange={handleDateSortChange}
                >
                    <option value="" hidden>Sort by date</option>
                    <option value="date-asc">Date Ascending</option>
                    <option value="date-desc">Date Descending</option>
                </select>
            </div>
        </div>
    );
}
SortSearch.propTypes = {
    onPriceSortChange: PropTypes.func.isRequired,
    onDateSortChange: PropTypes.func.isRequired
};
