import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RelatedGoodStyle.css';

const apiUrl = "http://localhost:8080/api/v1/guest/related-products"; // URL API để lấy dữ liệu sản phẩm liên quan

const RelatedGood = () => {
    const itemsPerPage = 4; // Số lượng sản phẩm mỗi trang
    const [products, setProducts] = useState([]);
    const [useSampleData, setUseSampleData] = useState(true); // Kiểm tra có sử dụng dữ liệu mẫu hay không
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Dữ liệu mẫu
    const sampleProducts = Array(20).fill(null).map((_, index) => ({
        PostID: index + 1,
        PostImage: "https://via.placeholder.com/100x100.png?text=Product",
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

    if (loading) {
        return <div>Loading...</div>;
    }

    const visibleProducts = products.slice(0, itemsPerPage);

    const handleProductClick = (id) => {
        navigate(`/post/${id}`);
    };

    return (
        <div className="related-goods-containersss">
            <h3 className="related-goods-title">Related goods</h3>
            <div className="related-goods-container">
                <div className="related-goods-grid">
                    {visibleProducts.map((product) => (
                        <div className="product-column" key={product.PostID} onClick={() => handleProductClick(product.PostID)}>
                            <div className="product-card-wrapper">
                                <img
                                    loading="lazy"
                                    src={product.PostImage}
                                    className="product-image-small"
                                    alt="Related product"
                                />
                                <p className="product-type">{product.isExchange}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RelatedGood;
