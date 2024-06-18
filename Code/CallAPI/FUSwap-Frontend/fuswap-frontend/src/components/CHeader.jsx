import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CHeader = () => {
    return (
        <AppBar position='static' style={{marginBottom: "50px"}}>
            <Toolbar>
                <Typography variant='h6' component="div" sx={{ flexGrow: 1 }}>
                    FUSwap
                </Typography>

                    {/*The URL must match App.jsx*/}
                    <Button color='inherit' component={Link} to="/customer">Home</Button>
                    <Button color='inherit' component={Link} to="/customer/dashboard">Dashboard</Button>
                    <Button color='inherit' component={Link} to="/customer/contact">Contact</Button>
                    <Button color='inherit' component={Link} to="/customer/logout">Logout</Button>
                    <Button color='inherit' component={Link} to="/customer/info"><span style={{fontSize: "50px"}}>🛌</span></Button>

            </Toolbar>
        </AppBar>
    );
};

export default CHeader;