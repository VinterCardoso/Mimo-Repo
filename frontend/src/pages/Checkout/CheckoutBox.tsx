import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useCart } from '../../contexts/CartContext';

interface CheckoutBoxProps {
  subtotal: number;
}

const CheckoutBox: React.FC<CheckoutBoxProps> = ({ subtotal }) => {
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const { finalizeOrder } = useCart();

  const handleApplyCoupon = () => {
    if (coupon === 'PETFOFINHO' && subtotal >= 199.90) {
      setDiscount(subtotal * 0.4);
    }
  };

  const total = subtotal - discount;

  return (
    <Box sx={{ 
        padding: 2,
        borderRadius: '8px', 
        width: '200px', 
        backgroundColor: 'white'
        }}>
      <TextField
        label="CUPOM DE DESCONTO"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
        fullWidth
        sx={{ marginY: 1 }}
      />
      <Button variant="outlined" color='contrast' onClick={handleApplyCoupon} fullWidth>
        Aplicar
      </Button>
      <Box sx={{display:'flex', justifyContent: 'space-between', marginTop: 2}}>
        <Typography color='#8B8B8B'>Subtotal:</Typography>
        <Typography color='#8B8B8B'>R$ {subtotal.toFixed(2)}</Typography>
      </Box>
      <Box sx={{display:'flex', justifyContent: 'space-between'}}>
        <Typography color='#8B8B8B'>Desconto:</Typography>
        <Typography color='#8B8B8B'>R$ {discount.toFixed(2)}</Typography>
      </Box>
      <Box sx={{width: '100%', height: '2px', backgroundColor: '#8B8B8B'}} />
      <Box sx={{display:'flex', justifyContent: 'space-between'}}>
        <Typography sx={{fontWeight: 'bold', color: "#5E5E5E"}}>Total:</Typography>
        <Typography sx={{fontWeight: 'bold', color: "#5E5E5E"}}>R$ {total.toFixed(2)}</Typography>
      </Box>
      <Button variant="contained" color="contrast" onClick={() => finalizeOrder()} fullWidth sx={{ marginTop: 2 }}>
        Finalizar pedido
      </Button>
    </Box>
  );
};

export { CheckoutBox };
