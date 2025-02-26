import { Box, ThemeProvider } from '@mui/material';
import { Topbar } from './components/Topbar/Topbar';
import { theme } from './Theme';
import { SnackbarProvider } from 'notistack';
import AppRoutes from './routes/routes';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <SnackbarProvider>
            <Box sx={{ backgroundColor: '#EDEDED' }}>
              <AppRoutes />
            </Box>
          </SnackbarProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
