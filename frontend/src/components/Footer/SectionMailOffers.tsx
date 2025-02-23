import { Box, Button, TextField, Typography } from "@mui/material"
import colors from "../../colors"

function SectionMailOffers() {

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '25px', backgroundColor: colors.primary, color: 'white', width: '97vw', alignItems: 'center', padding: '20px'}}>
            <Typography variant="span" sx={{textTransform: 'uppercase'}}>
                Cadastre-se para ficar por dentro das nossas ofertas e novidades !!!
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', gap: '15px'}}>
                <TextField variant="filled" label="Digite seu nome" sx={{backgroundColor: 'white', borderRadius: '4px'}}/>
                <TextField variant="filled" label="Digite seu e-mail" sx={{backgroundColor: 'white', borderRadius: '4px'}}/>
                <Button variant="contained" sx={{backgroundColor: colors.contrast, color: 'white', borderRadius: '4px', height: '56px'}}>
                    Cadastrar
                </Button>
                </Box>
        </Box>
    )
}

export {SectionMailOffers}