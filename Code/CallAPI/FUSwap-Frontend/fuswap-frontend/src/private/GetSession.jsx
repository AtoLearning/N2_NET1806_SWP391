
import Cookies from "js-cookie";
import React from "react";


export default function GetSession() {
    const handleReceiveSessionId = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('sessionid'); // Assuming 'sessionid' is passed as query parameter

        if (sessionId) {
            // Set cookie with the received session ID
            Cookies.set("sessionid", sessionId, { path: "/", expires: 1/24 });
            // Redirect or perform actions as needed
            window.location.href = "http://localhost:3000/customer";
        } else {
            console.error("Session ID not received.");
        }
    };

    React.useEffect(() => {
        handleReceiveSessionId();
    }, []);
}
