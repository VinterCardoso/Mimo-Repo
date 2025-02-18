import { Box, Typography } from "@mui/material";
import colors from "../../colors";

function TopbarCoupon() {
  return (
    <Box sx={{bgcolor: colors.primary, color: 'white', padding: '10px', textAlign: 'center', borderRadius: '0px 0px 20px 20px', width: '80%'}}>
        USE O CUPOM&nbsp;
            <Typography variant="span" fontWeight={800}>PETFOFINHO</Typography>
            &nbsp;E GANHE 40% OFF NAS COMPRAS ACIMA DE R$199,90
    </Box>
  );
}

export {TopbarCoupon}