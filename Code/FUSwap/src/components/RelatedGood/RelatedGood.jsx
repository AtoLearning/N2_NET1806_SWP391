import axios from "axios";
import React, { useState, useEffect } from 'react';
import './RelatedGoodStyle.css';

const apiUrl = "http://localhost:8080/api/v1/guest/related-products"; // URL API để lấy dữ liệu sản phẩm liên quan

const RelatedGood = () => {
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 10; // Số lượng sản phẩm mỗi trang
    const [products, setProducts] = useState([]);
    const [useSampleData, setUseSampleData] = useState(true); // Kiểm tra có sử dụng dữ liệu mẫu hay không
    const [loading, setLoading] = useState(true);

    // Dữ liệu mẫu
    const sampleProducts = Array(20).fill(null).map((_, index) => ({
        id: index + 1,
        image: "https://via.placeholder.com/100x100.png?text=Product",
        isExchange: index % 2 === 0 ? "Trade" : "Sell"
    }));

    const fetchProducts = async () => {
        if (useSampleData) {
            setProducts(sampleProducts);
            setLoading(false);
        } else {
            try {
                const response = await axios.get(apiUrl, {
                    withCredentials: true
                });
                if (response.status === 200) {
                    setProducts(response.data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [useSampleData]);

    const handlePrevious = () => {
        setStartIndex(prev => Math.max(prev - itemsPerPage, 0));
    };

    const handleNext = () => {
        setStartIndex(prev => Math.min(prev + itemsPerPage, products.length - itemsPerPage));
    };

    const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h3 className="related-goods-title">Related goods</h3>
            <div className="related-goods-container">
                <div className="related-goods-grid">
                    <div className="navigation-column">
                        <div className="navigation-wrapper">
                            <button 
                                className="nav-button" 
                                aria-label="Previous item" 
                                onClick={handlePrevious}
                                disabled={startIndex === 0}
                            >
                                &lt;&lt;
                            </button>
                        </div>
                    </div>
                    {visibleProducts.map((product) => (
                        <div className="product-column" key={product.id}>
                            <div className="product-card-wrapper">
                                <img
                                    loading="lazy"
                                    src={product.image}
                                    className="product-image-small"
                                    alt="Related product"
                                />
                                <p className="product-type">{product.isExchange}</p>
                            </div>
                        </div>
                    ))}
                    <div className="navigation-column">
                        <div className="navigation-wrapper">
                            <button 
                                className="nav-button" 
                                aria-label="Next item" 
                                onClick={handleNext}
                                disabled={startIndex >= products.length - itemsPerPage}
                            >
                                &gt;&gt;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RelatedGood;
