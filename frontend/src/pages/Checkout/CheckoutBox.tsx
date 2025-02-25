import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

interface CheckoutBoxProps {
  subtotal: number;
}

const CheckoutBox: React.FC<CheckoutBoxProps> = ({ subtotal }) => {
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleApplyCoupon = () => {
    if (coupon === 'DESCONTO10') {
      setDiscount(subtotal * 0.1);
    } else {
      setDiscount(0);
      alert('Cupom inválido');
    }
  };

  const total = subtotal - discount;

  return (
    <Box sx={{ 
        padding: 2,
        border: '1px solid #ccc',
        borderRadius: '8px', 
        width: '200px', 
        marginTop: 2,
        backgroundColor: 'white'
        }}>
      <Typography variant="h6">Resumo da Compra</Typography>
      <TextField
        label="CUPOM DE DESCONTO"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
        fullWidth
        sx={{ marginY: 1 }}
      />
      <Button variant="contained" onClick={handleApplyCoupon} fullWidth>
        Aplicar Cupom
      </Button>
      <Typography>Subtotal: R$ {subtotal.toFixed(2)}</Typography>
      <Typography sx={{ marginTop: 0 }}>Desconto: R$ {discount.toFixed(2)}</Typography>
      <Typography variant="h6" sx={{ marginTop: 1 }}>Total: R$ {total.toFixed(2)}</Typography>
      <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
        Finalizar Compra
      </Button>
    </Box>
  );
};

export { CheckoutBox };
