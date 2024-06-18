import Footer from "../components/Footer.jsx";
import axios from "axios";
import CHeader from "../components/CHeader.jsx";
import {Link, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {Button} from "@mui/material";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";

const baseURL = "http://localhost:8080/api/v1/customer/homepage/permission";
const baseURLDelete = "http://localhost:8080/api/v1/customer/category";

export default function CDashboard() {

    //check if there is 'sessionid' in the cookie
    const navigate = useNavigate();
    useEffect(() => {
        const sessionCookie = Cookies.get("sessionid");
        if (!sessionCookie) {
            //navigate to homepage if not logged in (or no cookie or expired cookie)
            navigate("/");
        }
    }, [navigate]);

    //get all category (high) in back-end ( call api by GET )
    const [categories, setCategories] = useState([]);
    const getAllCategoriesHigh = async () => {
        try {
            const response = await axios.get(baseURL, { withCredentials: true });
            if(response.status === 200) {
                //if the back-end returns a json file with the required data, get it
                setCategories(response.data);
            }
        } catch (error) {
            //if not, console.log the error
            console.log(error);
        }
    };
    useEffect(() => {
        getAllCategoriesHigh();
    }, []);

    //delete ( update ) a category by id ( call api by DELETE )
    const handleDelete = async (cateId) => {
        if (window.confirm(`Are you sure that you want to delete a category with ID: ${cateId}`)) {
            const response = await axios.delete(`${baseURLDelete}/${cateId}`, {withCredentials: true });
            console.log(response.status);
            if (response.status === 200) {
                //load category list again
                getAllCategoriesHigh();
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        }
    }

    return (
        <>
            <CHeader/>
            <div>
                <Button style={{float: "right", fontSize: "20px", marginBottom: "30px"}}
                        component={Link} to="/customer/category">

                    Add new category

                </Button>
            </div>

            <div style={{marginTop: "50px"}}>
                <table style={{width: '100%', fontSize: '18px'}}>
                    <thead>
                    <tr>
                        <th>CateID</th>
                        <th>CateName</th>
                        <th>Available</th>
                        <th>Manager</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {(categories) ? (categories.map((category) => (

                            // The field to call to get the data must match
                            //     the field on the back-end OR match the returned json

                            <tr key={category.cateId}>
                                <td style={{textAlign: 'center'}}>{category.cateId}</td>
                                <td style={{textAlign: 'center'}}>{category.cateName}</td>
                                <td style={{textAlign: 'center'}}>{category.available ? "Yes" : "No"}</td>
                                <td style={{color: 'red', textAlign: 'center'}}>{category.fullnameManager}</td>
                                <td style={{color: 'red', textAlign: 'center', width: "250px"}}>
                                    <Button component={Link} to={`/customer/category/${category.cateId}`}>Update</Button>
                                    <Button onClick={() => handleDelete(category.cateId)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{textAlign: 'center'}}>No data</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <Footer/>
        </>
    );
}
