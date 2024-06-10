// eslint-disable-next-line no-unused-vars
import React from 'react';

export default function LoginWithGoogle() {
    const handleLogin = () => {
        window.location.href = "http://localhost:8080/login/oauth2/v2/auth";
    };

    return (
        <>
            <button onClick={handleLogin}>Login with Google</button>

        </>
    );
}
