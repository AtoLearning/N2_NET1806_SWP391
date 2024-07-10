import React, { useState, useEffect } from "react";
import axios from "axios";
import './FilterSearchStyle.css';

const baseURL = "http://localhost:8080/api/v1/guest/categories"; // URL API để lấy dữ liệu danh mục

export default function FilterSearch() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [useSampleData, setUseSampleData] = useState(true); // State để kiểm tra có sử dụng dữ liệu mẫu hay không

    // Dữ liệu mẫu
    const sampleCategories = [
        { name: "Sample Category 1" },
        { name: "Sample Category 2" },
        { name: "Sample Category 3" },
        { name: "Sample Category 4" },
        { name: "Sample Category 5" },
    ];

    useEffect(() => {
        const fetchCategories = async () => {
            if (useSampleData) {
                // Sử dụng dữ liệu mẫu và đặt loading thành false
                setCategories(sampleCategories);
            } else {
                try {
                    const response = await axios.get(baseURL, { withCredentials: true });
                    if (response.status === 200) {
                        setCategories(response.data.obj);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };

        fetchCategories();
    }, [useSampleData]);

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
                    {categories.map((category, index) => (
                        <li key={index} onClick={() => handleCategoryChange(category.name)}>
                            {category.name}
                        </li>
                    ))}
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
