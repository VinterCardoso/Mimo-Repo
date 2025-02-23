import { Box, Typography } from "@mui/material";
import { Product } from "../../services/endpoints/ProductEndpoint";
import colors from "../../colors";
import "./productCard.css"


function ProductCard({product}: Product) {

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start', padding: '20px', backgroundColor: 'white', borderRadius: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <Box sx={{borderRadius: '20px', overflow: 'hidden', border: `1px solid ${colors.primary}`, padding: '10px'}}>
                    <img src={product.photoUrl} alt={product.name} className="imgCard"/>
                </Box>
            </Box>
            <Typography variant="span" sx={{fontSize: '18px', color: "#5E5E5E"}}>
                {product.name}
            </Typography>

            <Typography variant="span" sx={{fontSize: '18px', color: "#5E5E5E", fontWeight: 'bold'}}>
                R$ {product.price.toFixed(2)}
            </Typography>
            <Typography variant="span" sx={{fontSize: '16px', color: "#5E5E5E"}}>
                em até 10x de R$ {(product.price / 10).toFixed(2)} sem juros
            </Typography>
        </Box>
    )
}

export { ProductCard };