import axios from "axios";
import Footer from "../components/Footer.jsx";
import CHeader from "../components/CHeader.jsx";
import {useEffect, useState} from "react";

const baseURL = "http://localhost:8080/api/v1/customer/contact";

export default function CContact() {

    //css for div below and is duplicated in other file jsx
    const grid_container = {
        display: "flex",
        gridTemplateColumns: "auto auto auto",
        gridGap: "100px",
        backgroundColor: "#f37121",
        padding: "10px"
    }
    const grid_item = {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        border: "1px solid rgba(0, 0, 0, 0.8)",
        padding: "20px",
        fontSize: "30px",
        textAlign: "center",
        width: "500px"
    }

    //get all manager in back-end ( call api by GET )
    const [managers, setManagers] = useState([]);
    useEffect(() => {
        const getAllManagers = async () => {
            try {
                const response = await axios.get(baseURL, { withCredentials: true });
                if(response.status === 200) {
                    //if the back-end returns a json file with the required data, get it
                    setManagers(response.data);
                }
            } catch (error) {
                //if not, console.log the error
                console.log(error);
            }
        };
        getAllManagers();
    }, []);

    return (
        <>
            <CHeader />
            <div style={grid_container}>
                {(managers) ? (managers.map((manager) => (

                        // The field to call to get the data must match
                        //     the field on the back-end OR match the returned json

                        <div key={manager.mUserName} style={grid_item}>
                            <img src={manager.avatar} alt="Avatar" style={{width: "100px"}}/>
                            <p style={{fontWeight: "bold", fontSize: "24px"}}>Name: {manager.fullName}</p>
                            <p style={{fontSize: "20px"}}>Nickname: {manager.nickname}</p>
                            <p style={{fontSize: "20px"}}>DOB: {manager.dob}</p>
                        </div>
                    ))
                ) : (
                    <h2 style={{textAlign: "center"}}>No anyone here!</h2>
                )}
            </div>
            <Footer/>
        </>
    );
}
