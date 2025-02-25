import React, { useState } from 'react';
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

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const mockCartItems: CartItem[] = [
  { id: 1, name: 'Produto 1', price: 100, quantity: 1 },
  { id: 2, name: 'Produto 2', price: 200, quantity: 2 },
];

export const Checkout: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [newItem, setNewItem] = useState({ name: '', price: 0, quantity: 1 });
  const [nextId, setNextId] = useState(mockCartItems.length + 1);

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleAddItem = () => {
    if (!newItem.name || newItem.price <= 0 || newItem.quantity <= 0) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    const newCartItem: CartItem = {
      id: nextId,
      name: newItem.name,
      price: newItem.price,
      quantity: newItem.quantity,
    };

    setCartItems([...cartItems, newCartItem]);
    setNextId(nextId + 1);
    setNewItem({ name: '', price: 0, quantity: 1 });
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        width: '100%',
        gap: 2, 
        marginTop: '1px',
      }}
    >
      {/* Seção do carrinho */}
      <Box sx={{ width: '60%' }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            marginBottom: 2,
            fontFamily: 'Outfit, sans-serif',
            textTransform: 'uppercase',
          }}
        >
          Carrinho de Compras
        </Typography>

        <TableContainer
          sx={{
            borderRadius: '10px',
          }}
          component={Paper}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Produto</TableCell>
                <TableCell align="right">Preço Unitário</TableCell>
                <TableCell align="right">Quantidade</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">R$ {item.price.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <TextField
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          handleQuantityChange(item.id, value);
                        }
                      }}
                      inputProps={{ min: 1 }}
                      sx={{ width: '80px' }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleRemoveItem(item.id)}
                      sx={{ minWidth: '100px' }}
                    >
                      Remover
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
          Total: R$ {total.toFixed(2)}
        </Typography>
      </Box>

      <Box sx={{ width: '28%', marginTop: 2 }}>
      <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            marginBottom: 2,
            fontFamily: 'Outfit, sans-serif',
            textTransform: 'uppercase',
          }}
        >
          Resumo da Compra
        </Typography>
        <CheckoutBox subtotal={total} />
      </Box>
    </Box>
  );
};