import axios from "axios";
import Footer from "../components/Footer.jsx";
import CHeader from "../components/CHeader.jsx";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";

const baseURL = "http://localhost:8080/api/v1/customer/info";

export default function CustomerInfo() {

    //check if there is 'sessionid' in the cookie
    const navigate = useNavigate();
    useEffect(() => {
        const sessionCookie = Cookies.get("sessionid");
        if (!sessionCookie) {
            //navigate to homepage if not logged in (or no cookie or expired cookie)
            navigate("/");
        }
    }, [navigate]);

    //get user's info ( call api by GET )
    const [info, setInfo] = useState({});
    const getUserInfo = async () => {
        try {
            const response = await axios.get(baseURL, { withCredentials: true });
            if(response.status === 200) {
                //if the back-end returns a json file with the required data, get it
                setInfo(response.data.obj);
            } else {
                //if not, console.log the error
                console.log("no data");
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <>
            <CHeader />
            {(info) ? (
                <div style={{border: "5px solid red", width: "700px", margin: "0px auto"}}>
                    <img src={info.picture} alt="Avatar" style={{width: "200px", marginLeft: "250px"}}/><br/>

                    {/*The field to call to get the data must match*/}
                    {/*     the field on the back-end OR match the returned json*/}

                    <h2 style={{textAlign: "center"}}>Email: {info.cuserName}</h2>
                    <h2 style={{textAlign: "center"}}>Name: {info.givenName} {info.familyName}</h2>
                    <h2 style={{textAlign: "center"}}>Wallet (coins): {info.wallet}</h2>
                    <h2 style={{textAlign: "center"}}>Points: {info.points}</h2>
                    <h2 style={{textAlign: "center"}}>Verified: {info.verified ? "Yes" : "No"}</h2>
                    <h2 style={{textAlign: "center"}}>Address: {info.address}</h2>
                    <h2 style={{textAlign: "center"}}>Date of birth: {info.dob}</h2>
                </div>
            ) : (
                <div>
                    Nothing
                </div>
            )

            }

            <Footer />
        </>
    );
}
