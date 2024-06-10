import axios from "axios";
import React from "react";

const baseURL = "http://localhost:8080/api/v1/user";

export default function UserInfo() {
    const [info, setInfo] = React.useState(null);

    React.useEffect(() => {
        axios.get(baseURL, { withCredentials: true }).then((response) => {
            setInfo(response.data);
        }).catch(error => {
            console.error('There was an error fetching the data!', error);
        });
    }, []);

    if (!info) return <div>Loading...</div>;


    return (
        <div>
            <h1>{info.name}</h1>
            <p>{info.given_name}</p>
            <p>{info.family_name}</p>
            <p>{info.email}</p>
        </div>
    );
}
