// eslint-disable-next-line no-unused-vars
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginGoogle from './components/LoginGoogle.jsx';
import UserInfo from './components/UserInfo.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="guest-home" element={<GuestHome />} />
                <Route path="/" element={<LoginGoogle />} />
                <Route path="customer-home" element={<CustomerHome />} />
                <Route path="/user" element={<UserInfo />} />
                <Route path="/post" element={<Post />} />
            </Routes>
        </Router>
    );
}

export default App;