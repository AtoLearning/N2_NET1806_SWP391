// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";


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

    // Check for session ID when component mounts
    React.useEffect(() => {
        handleReceiveSessionId();
    }, []);
}
