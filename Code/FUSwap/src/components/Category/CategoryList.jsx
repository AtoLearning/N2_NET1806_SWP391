import axios from "axios";
import React, { useEffect, useState } from "react";
import './CategoryListStyle.css';

const baseURL = "http://localhost:8080/api/v1/guest/homepage";

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [useSampleData, setUseSampleData] = useState(true); // State để kiểm tra có sử dụng dữ liệu mẫu hay không

    // Dữ liệu mẫu
    const sampleCategories = [
        { icon: "https://via.placeholder.com/150", name: "Electronics" },
        { icon: "https://via.placeholder.com/150", name: "Fashion" },
        { icon: "https://via.placeholder.com/150", name: "Home & Garden" },
        { icon: "https://via.placeholder.com/150", name: "Sports" },
        { icon: "https://via.placeholder.com/150", name: "Automotive" },
        { icon: "https://via.placeholder.com/150", name: "Books" },
        { icon: "https://via.placeholder.com/150", name: "Toys" },
        { icon: "https://via.placeholder.com/150", name: "Beauty" },
        { icon: "https://via.placeholder.com/150", name: "Music" },
        { icon: "https://via.placeholder.com/150", name: "Movies" },
    ];

    const getAllCategories = async (page) => {
        if (useSampleData) {
            // Sử dụng dữ liệu mẫu thay vì gọi API
            setCategories(sampleCategories);
            setTotalPages(1); // Giả sử có 1 trang dữ liệu mẫu
            return;
        }

        try {
            const response = await axios.get(baseURL, {
                params: {
                    page: page,
                },
                withCredentials: true
            });
            if (response.status === 200) {
                setCategories(response.data.content);
                setTotalPages(response.data.totalPages);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategories(page);
    }, [page]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className="category-list-container">
            <section className="category-section">
                {Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((category, index) => (
                        <div className="category-item" key={index}>
                            <img
                                src={category.icon}
                                alt="Category icon"
                                className="category-icon"
                            />
                            <div className="category-name">{category.name}</div>
                        </div>
                    ))
                ) : (
                    <div className="no-data">No data</div>
                )}
            </section>
            
        </div>
    );
}
