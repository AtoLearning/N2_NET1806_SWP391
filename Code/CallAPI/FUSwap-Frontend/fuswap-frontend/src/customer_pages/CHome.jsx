import Footer from "../components/Footer.jsx";
import axios from "axios";
import CHeader from "../components/CHeader.jsx";
import {useEffect, useState} from "react";

const baseURL = "http://localhost:8080/api/v1/customer/homepage";

export default function CHome() {

    //get all category in back-end ( call api by GET )
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const getAllCategories = async (page) => {
        try {
            const response = await axios.get(baseURL, {
                params: {
                    page: page,
                    // size: 3,
                },
                withCredentials: true });
            if(response.status === 200) {
                //if the back-end returns a json file with the required data, get it
                setCategories(response.data.content);
                console.log(response.data);
                setTotalPages(response.data.totalPages);
                // console.log(response.data);
            }
        } catch (error) {
            //if not, console.log the error
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
        <>
            <CHeader/>
            <div style={{marginTop: "50px"}}>
                <table style={{width: '100%', fontSize: '18px'}}>
                    <thead>
                    <tr>
                        <th>CateID</th>
                        <th>CateName</th>
                        <th>Manager</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(categories) && categories.length > 0 ? (
                        categories.map((category) => (
                            <tr key={category.cateId}>
                                <td style={{textAlign: 'center'}}>{category.cateId}</td>
                                <td style={{textAlign: 'center'}}>{category.cateName}</td>
                                <td style={{color: 'red', textAlign: 'center'}}>{category.fullnameManager}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{textAlign: 'center'}}>No data</td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <div style={{textAlign: 'center', marginTop: '20px'}}>
                    <button onClick={() => handlePageChange(page - 1)} disabled={page <= 0}>
                        Previous
                    </button>
                    <span style={{margin: '0 10px'}}>{page + 1} / {totalPages}</span>
                    <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages - 1}>
                        Next
                    </button>
                </div>
            </div>
            <Footer/>
        </>
    );
}
