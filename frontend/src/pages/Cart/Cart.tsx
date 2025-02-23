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
import { Topbar } from '../../components/Topbar/Topbar';
import AddIcon from '@mui/icons-material/Add';

// Definindo a interface para um item do carrinho
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Dados mockados para o carrinho
const mockCartItems: CartItem[] = [
  { id: 1, name: 'Produto 1', price: 100, quantity: 1 },
  { id: 2, name: 'Produto 2', price: 200, quantity: 2 },
];

export const Cart: React.FC = () => {
  // Estado para armazenar os itens do carrinho (inicializado com dados mockados)
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);

  // Estado para o formulário de adicionar item
  const [newItem, setNewItem] = useState({ name: '', price: 0, quantity: 1 });

  // Função para remover um item do carrinho
  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Função para atualizar a quantidade de um item
  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Função para adicionar um novo item ao carrinho
  const handleAddItem = () => {
    if (!newItem.name || newItem.price <= 0 || newItem.quantity <= 0) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    // Cria um novo item com um ID único
    const newCartItem: CartItem = {
      id: cartItems.length + 1, // Gera um ID simples (não recomendado para produção)
      name: newItem.name,
      price: newItem.price,
      quantity: newItem.quantity,
    };

    // Adiciona o novo item ao carrinho
    setCartItems([...cartItems, newCartItem]);

    // Limpa o formulário
    setNewItem({ name: '', price: 0, quantity: 1 });
  };

  // Calcular o valor total do carrinho
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '45%',
        marginBottom: '10px',
      }}
    >
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

      {}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom>
          Adicionar Produto
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            label="Nome do Produto"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            sx={{ flex: 2 }}
          />
          <TextField
            label="Preço"
            type="number"
            value={newItem.price}
            onChange={(e) =>
              setNewItem({ ...newItem, price: parseFloat(e.target.value) })
            }
            sx={{ flex: 1 }}
          />
          <TextField
            label="Quantidade"
            type="number"
            value={newItem.quantity}
            onChange={(e) =>
              setNewItem({ ...newItem, quantity: parseInt(e.target.value) })
            }
            sx={{ flex: 1 }}
          />
          <Button variant="contained" onClick={handleAddItem}>
            <AddIcon sx={{ width: '24px', height: '24px', color: 'white' }} />
          </Button>
        </Box>
      </Box>

      {/* Tabela de itens do carrinho */}
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
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    inputProps={{ min: 1 }}
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
                  >
                    Remover
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Total do carrinho */}
      <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
        Total: R$ {total.toFixed(2)}
      </Typography>
    </Box>
  );
};
