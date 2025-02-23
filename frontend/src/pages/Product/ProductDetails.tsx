import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import colors from '../../colors';

function ProductDetails() {
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const id = useLocation().pathname.split('/')[2];
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || isNaN(+id)) navigate('/');

    async function getProduct() {
      const response = await api.product.getById(id);
      setProduct(response.data);
      setIsLoading(false);
    }
    getProduct();
  }, [id]);

  return (
    <Box>
      {isLoading ? (
        <Box />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            height: '365px',
            gap: '16px',
            paddingTop: '32px',
          }}
        >
          <Box
            sx={{
              height: '100%',
              backgroundColor: 'white',
              padding: '30px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'center',
              borderRadius: '25px',
            }}
          >
            <Box>
              <img
                src={product.photoUrl}
                alt={product.name}
                style={{ width: '300px', height: '300px' }}
                className="imgCard"
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'space-around',
                gap: '30px',
              }}
            >
              <Typography variant="h4">{product.name}</Typography>
              <Typography variant="h6">{product.description}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              height: '100%',
              backgroundColor: 'white',
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'space-around',
              borderRadius: '25px',
            }}
          >
            <Typography
              variant="h4"
              color={colors.primary}
              sx={{ fontWeight: 900 }}
            >
              R$ {product.price}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" color="#8B8B8B">
                Unidades
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Button
                  variant="text"
                  color="#8B8B8B"
                  onClick={(e) => {
                    if (quantity === 0) return;
                    setQuantity((quantity) => quantity - 1);
                  }}
                >
                  -
                </Button>
                <TextField
                  variant="outlined"
                  value={quantity}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (isNaN(+value) || +value < 1) return setQuantity(0);
                    setQuantity(value);
                  }}
                  sx={{ width: '52px', textAlign: 'center' }}
                />
                <Button
                  variant="text"
                  color="#8B8B8B"
                  onClick={(e) => {
                    setQuantity((quantity) => quantity + 1);
                  }}
                >
                  +
                </Button>
              </Box>
            </Box>
            <Button variant="contained" color="contrast" fullWidth>
              Adicionar ao carrinho
            </Button>
            <Box>
              <Typography variant="h6" color="#8B8B8B">
                Frete e prazo
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                <TextField
                  variant="outlined"
                  placeholder="Digite seu CEP"
                  sx={{ width: '200px' }}
                />
                <Button variant="outlined" color="contrast" sx={{ height: "100%"}}>
                  Ok!
                </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export { ProductDetails };
