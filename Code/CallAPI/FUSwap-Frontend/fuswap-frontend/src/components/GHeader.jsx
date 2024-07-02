import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <AppBar position='static' style={{marginBottom: "50px"}}>
            <Toolbar>
                <Typography variant='h6' component="div" sx={{ flexGrow: 1 }}>
                    FUSwap
                </Typography>

                {/*The URL must match App.jsx*/}
                <Button color='inherit' component={Link} to="/">Home</Button>
                <Button color='inherit' component={Link} to="/login">Login</Button>
                <Button color='inherit' component={Link} to="/guest/contact">Contact</Button>

            </Toolbar>
        </AppBar>
    );
};

export default Header;