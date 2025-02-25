import { Box } from '@mui/material';
import { TopbarCoupon } from './TopbarCoupon';
import mimoLogo from '../../assets/mimoLogo.png';
import { Search } from '../Search/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import colors from '../../colors';
import { TopbarSections } from './TopbarSections';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';

function Topbar() {
  const navigate = useNavigate();
  const { cart } = useCart();

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <TopbarCoupon />
      <Box sx={{ display: 'flex', gap: '45px', alignItems: 'center' }}>
        <Box sx={{ width: '320px' }}>
          <img
            src={mimoLogo}
            alt="Mimo"
            width={300}
            onClick={() => navigate('/')}
          />
        </Box>
        <Box>
          <Search />
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '100px',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {cart.length > 0 && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  position: 'absolute',
                  margin: '15px 0 0 15px',
                  backgroundColor: colors.primary,
                  borderRadius: '50%',
                  width: '15px',
                  height: '15px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <span style={{ color: 'white', fontSize: '12px' }}>
                  {cart.length}
                </span>
              </Box>
            </>
          )}
          <ShoppingCartOutlinedIcon
            sx={{ width: '24px', height: '24px', color: colors.primary }}
            onClick={() => navigate('/checkout')}
          />
          <SentimentSatisfiedAltOutlinedIcon
            sx={{ width: '24px', height: '24px', color: colors.primary }}
          />
        </Box>
      </Box>
      <Box>
        <TopbarSections />
      </Box>
    </Box>
  );
}

export { Topbar };
