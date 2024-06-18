import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box component="footer" sx={{mt:'auto', p:2, backgroundColor: 'blue', color: 'white', marginTop: "50px"}}>
            <Typography align='center'>2024 FUSwap</Typography>
        </Box>
    );
};

export default Footer;