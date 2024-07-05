import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
import './PostListStyle.css';
import { FaHandshake, FaMoneyBillWave } from "react-icons/fa";

const baseURL = "http://localhost:8080/api/v1/guest/posts";

export default function PostList() {
    const [products, setProducts] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(0);
    // const [useSampleData, setUseSampleData] = useState(true); // State để kiểm tra có sử dụng dữ liệu mẫu hay không

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Dữ liệu mẫu
    // const sampleProducts = [
    //     {
    //         image: "https://via.placeholder.com/150",
    //         name: "Sample Product 1",
    //         description: "This is a description for Sample Product 1",
    //         price: "25.000",
    //         isExchange: false
    //     },
    //     {
    //         image: "https://via.placeholder.com/150",
    //         name: "Sample Product 2",
    //         description: "This is a description for Sample Product 2",
    //         price: "Trade",
    //         isExchange: true
    //     },
    //     {
    //         image: "https://via.placeholder.com/150",
    //         name: "Sample Product 3",
    //         description: "This is a description for Sample Product 3",
    //         price: "50.000",
    //         isExchange: false
    //     },
    //     {
    //         image: "https://via.placeholder.com/150",
    //         name: "Sample Product 4",
    //         description: "This is a description for Sample Product 4",
    //         price: "75.000",
    //         isExchange: false
    //     },
    //     // Thêm dữ liệu mẫu nếu cần
    // ];

    const getAllProducts = async (page) => {
        // if (useSampleData) {
        //     // Sử dụng dữ liệu mẫu thay vì gọi API
        //     setProducts(sampleProducts);
        //     setTotalPages(1); // Giả sử có 1 trang dữ liệu mẫu
        //     return;
        // }

        try {
            const response = await axios.get(baseURL, {
                params: {
                    pageNo: page, // Backend thường tính trang bắt đầu từ 0
                },
                withCredentials: true
            });
            if (response.status === 200) {
                setProducts(response.data.obj);
                setTotalPages(response.data.totalPages);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllProducts(page);
    }, [page]);
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className="post-list-container">
            <div className="product-grid">
                {Array.isArray(products) && products.length > 0 ? (
                    products.map((product, index) => (
                        <article className="product-card" key={index}>
                            <img
                                src={product.postImage}
                                alt="Product image"
                                className="product-image"
                            />
                            <h3 className="product-name">{product.title}</h3>
                            <p className="product-description">{product.content}</p>
                            <div className="product-price">
                                {product.isExchange ? (
                                    <span><FaHandshake/></span>
                                ) : (
                                    <>
                                        <span>{product.unitPrice} </span>
                                        <span><FaMoneyBillWave/></span>
                                    </>
                                )}
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="no-data">No data</div>
                )}
            </div>
            {/*<div className="pagination-container">*/}
            {/*    <Pagination */}
            {/*        showControls */}
            {/*        total={totalPages} */}
            {/*        initialPage={1} */}
            {/*        page={currentPage} */}
            {/*        onChange={(page) => setCurrentPage(page)} */}
            {/*    />*/}
            {/*</div>*/}
            <div style={{textAlign: 'center', marginTop: '20px'}}>
                <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
                    Previous
                </button>
                <span style={{margin: '0 10px'}}>{page} / {totalPages}</span>
                <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}
