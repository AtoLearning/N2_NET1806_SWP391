import axios from "axios";
import Footer from "../components/Footer.jsx";
import GuestHeader from "../components/GHeader.jsx";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";

const baseURL = "http://localhost:8080/api/v1/guest/homepage";

export default function GHome() {

    //check if there is 'sessionid' in the cookie
    const navigate = useNavigate();
    useEffect(() => {
        const sessionCookie = Cookies.get("sessionid");
        if (sessionCookie) {
            //navigate to customer's homepage if log in successfully ( That means there is cookie )
            navigate("/customer");
        }
    }, [navigate]);

    const [categories, setCategories] = useState([]);

    //get all categories ( call API with GET )
    const getAllCategories = async () => {
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
        getAllCategories();
    }, []);

    return (
        <>
            <GuestHeader />

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
                    {(categories) ? (categories.map((category) => (
                        <tr key={category.cateId}>

                            {/*
                            The field to call to get the data must match
                                the field on the back-end OR match the returned json
                            */}

                            <td style={{textAlign: 'center'}}>{category.cateId}</td>
                            <td style={{textAlign: 'center'}}>{category.cateName}</td>
                            <td style={{color: 'red', textAlign: 'center'}}>{category.fullnameManager}</td>
                        </tr>
                        ))
                    ) : (
                        <tr><td colSpan = "3" style={{textAlign: 'center'}}>No data</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Footer />
        </>
    );
}
