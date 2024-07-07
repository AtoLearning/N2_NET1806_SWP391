import React, { useState } from "react";
import './FilterSearchStyle.css';

export default function FilterSearch() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");
    const [selectedType, setSelectedType] = useState("");

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handlePriceChange = (price) => {
        setSelectedPrice(price);
    };

    const handleTypeChange = (type) => {
        setSelectedType(type);
    };

    return (
        <div className="filter-container">
            <div className="filter-category">
                <h3>All categories</h3>
                <ul>
                    <li onClick={() => handleCategoryChange("Đồ dùng học sinh")}>Đồ dùng học sinh</li>
                    <li onClick={() => handleCategoryChange("Đồ dùng học sinh")}>Đồ dùng học sinh</li>
                    <li onClick={() => handleCategoryChange("Đồ dùng học sinh")}>Đồ dùng học sinh</li>
                    <li onClick={() => handleCategoryChange("Đồ dùng học sinh")}>Đồ dùng học sinh</li>
                    <li onClick={() => handleCategoryChange("Đồ dùng học sinh")}>Đồ dùng học sinh</li>
                    <li onClick={() => handleCategoryChange("Đồ dùng học sinh")}>Đồ dùng học sinh</li>
                    <li onClick={() => handleCategoryChange("Đồ dùng học sinh")}>Đồ dùng học sinh</li>
                </ul>
            </div>
            <div className="filter-price">
                <h3>Price</h3>
                <label>
                    <input
                        type="radio"
                        name="price"
                        value="low-to-high"
                        checked={selectedPrice === "low-to-high"}
                        onChange={() => handlePriceChange("low-to-high")}
                    />
                    from lowest to highest
                </label>
                <label>
                    <input
                        type="radio"
                        name="price"
                        value="high-to-low"
                        checked={selectedPrice === "high-to-low"}
                        onChange={() => handlePriceChange("high-to-low")}
                    />
                    from highest to lowest
                </label>
            </div>
            <div className="filter-type">
                <h3>Type</h3>
                <label>
                    <input
                        type="radio"
                        name="type"
                        value="sell"
                        checked={selectedType === "sell"}
                        onChange={() => handleTypeChange("sell")}
                    />
                    Sell
                </label>
                <label>
                    <input
                        type="radio"
                        name="type"
                        value="trade"
                        checked={selectedType === "trade"}
                        onChange={() => handleTypeChange("trade")}
                    />
                    Trade
                </label>
            </div>
        </div>
    );
}
