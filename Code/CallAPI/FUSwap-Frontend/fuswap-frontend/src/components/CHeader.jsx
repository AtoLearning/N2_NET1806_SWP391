// eslint-disable-next-line no-unused-vars
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CHeader = () => {
    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' component="div" sx={{ flexGrow: 1 }}>
                    FUSwap
                </Typography>
                <Button color='inherit' component={Link} to="/customer">Home</Button>
                <Button color='inherit' component={Link} to="/customer/dashboard">Dashboard</Button>
                <Button color='inherit' component={Link} to="/customer/logout">Logout</Button>
                <Button color='inherit' component={Link} to="/customer/contact">Contact</Button>
            </Toolbar>
        </AppBar>
    );
};

export default CHeader;