import { Box } from '@mui/material'; // Importando o Box do Material-UI
import { useEffect, useState } from 'react';
import { Product } from '../../services/endpoints/ProductEndpoint';
import api from '../../services/api';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import DestaqueCachorro from '../../assets/cachorroDestaque.png';
import DestaqueGato from '../../assets/gatoDestaque.png';

function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getProducts() {
      const rawData = await api.product.listAll();
      setProducts(rawData.data);
    }

    getProducts();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
      <img src={DestaqueGato} alt="Destaque Gato" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '20px',
          padding: '20px',
        }}
      >
        {products.map((product, index) => (
          <>
          {index < 5   && <ProductCard key={product.id} product={product} />}
          </>
        ))}
      </Box>

      <img src={DestaqueCachorro} alt="Destaque Cachorro" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '20px',
          padding: '20px',
        }}
      >
        {products.map((product, index) => (
          <>
          {index < 5   && <ProductCard key={product.id} product={product} />}
          </>
        ))}
      </Box>
    </Box>
  );
}

export { Home };
