import { Box, ThemeProvider } from '@mui/material';
import { Topbar } from './components/Topbar/Topbar';
import { theme } from './Theme';
import { SnackbarProvider } from 'notistack';
import AppRoutes from './routes/routes';

function App() {
  return (
    // <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <Box sx={{ backgroundColor: '#EDEDED', height: '100vh' }}>
          {/* <Topbar /> */}
          <AppRoutes />
        </Box>
      </SnackbarProvider>
    // </ThemeProvider>
  );
}

export default App;
