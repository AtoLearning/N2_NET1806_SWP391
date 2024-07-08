import axios from "axios";
import React, { useEffect, useState } from "react";
import './CategoryListStyle.css';

const baseURL = "http://localhost:8080/api/v1/guest/categories";

export default function CategoryList() {
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

    return (
        <div className="category-list-container">
            <section className="category-section">
                {Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((category, index) => (
                        <div className="category-item" style={{width: "250px"}} key={index}>
                            <img
                                src={category.cateImage}
                                alt="Category icon"
                                className="category-icon"
                            />
                            <div className="category-name">{category.cateName}</div>
                        </div>
                    ))
                ) : (
                    <div className="no-data">No data</div>
                )}
            </section>
            
        </div>
    );
}
