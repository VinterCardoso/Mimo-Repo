import { Box, Typography } from "@mui/material";
import gatoBanho from '../../assets/gatoBanho.jpg';

function PageInConstruction() {

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '5px', width: '80vw'}}>
            <Typography variant="span" fontSize={24}>Página em construção</Typography>
            <Typography variant="span" fontSize={24}>Volte outra hora</Typography>
            <img src={gatoBanho} alt="gatoBanho"/>  
        </Box>
    )
}

export {PageInConstruction};    