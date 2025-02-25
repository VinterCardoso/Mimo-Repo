import { Box, Button, Typography } from "@mui/material";
import { Product } from "../../services/endpoints/ProductEndpoint";
import { useCart } from "../../contexts/CartContext";

function CheckoutItemHorizontal(props: {product: Product, quantity: number}) {
    const {product, quantity} = props;
    const { addToCart, removeFromCart } = useCart();
    console.log(product);
    return (
        <Box sx={{display: 'flex', gap: '10px', padding: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
            <Box sx={{width: '100px', height: '100px'}}>
                <img src={product.photoUrl} alt={product.name} className="imgFit" />
            </Box>
            <Box width="200px">
                <Typography variant="span" color="#5E5E5E">{product.name}</Typography>
            </Box>
            <Box width="200px" sx={{display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant="span" color="#5E5E5E">Quantidade</Typography>
                <Box sx={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                    <Button variant="outlined" onClick={() => removeFromCart(product)}>-</Button>
                    <Typography variant="span" color="#5E5E5E">{quantity}</Typography>
                    <Button variant="outlined" onClick={() => addToCart(product)}>+</Button>
                </Box>
            </Box>
            <Box width="200px" sx={{display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant="span" color="#5E5E5E">Total</Typography>
                <Typography variant="span" color="#5E5E5E">R$ {(product.price * quantity).toFixed(2)}</Typography>
            </Box>
        </Box>
    )
}

export { CheckoutItemHorizontal };