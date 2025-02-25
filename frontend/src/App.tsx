import { Box, ThemeProvider } from '@mui/material';
import { Topbar } from './components/Topbar/Topbar';
import { theme } from './Theme';
import { SnackbarProvider } from 'notistack';
import AppRoutes from './routes/routes';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <SnackbarProvider>
          <Box sx={{ backgroundColor: '#EDEDED' }}>
            <AppRoutes />
          </Box>
        </SnackbarProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
