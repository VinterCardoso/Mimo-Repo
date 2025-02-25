import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { CheckoutBox } from '../Checkout/CheckoutBox';
import { CartItem, useCart } from '../../contexts/CartContext';
import { CheckoutItemHorizontal } from './CheckoutItemHorizontal';
import { useNavigate } from 'react-router-dom';

export const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartSubTotal, isLoading, success, setSuccess } = useCart();

  useEffect(() => {
    if (success) {
      setSuccess(false);
      navigate('/')
    }
  }
  , [success]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: '100%',
          marginTop: '1px',
          gap: '20px',
          width: '100%',
        }}
      >
        {!isLoading && (
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                flex: 2,
              }}
            >
              <Typography
                variant="span"
                sx={{
                  fontWeight: 'bold',
                  color: '#5E5E5E',
                  fontSize: '24px',
                }}
              >
                Meu Carrinho
              </Typography>

              <Box
                sx={{
                  backgroundColor: 'white',
                  padding: 2,
                  borderRadius: '8px',
                }}
              >
                {cart.length > 0 &&
                  cart.map((item: CartItem) => (
                    <CheckoutItemHorizontal
                      key={item.id}
                      product={item.product}
                      quantity={item.quantity}
                    />
                  ))}
              </Box>
            </Box>

            <Box
              Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                flex: 1,
              }}
            >
              <Typography
                variant="span"
                sx={{
                  fontWeight: 'bold',
                  color: '#5E5E5E',
                  fontSize: '24px',
                }}
              >
                Resumo da compra
              </Typography>
              <CheckoutBox subtotal={cartSubTotal} />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};
