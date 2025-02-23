import { Box } from '@mui/material';
import { Topbar } from '../components/Topbar/Topbar';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer/Footer';

function TopbarLayout() {
  return (
    <Box
      sx={{
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '30px',
      }}
    >
      <Topbar />
      <Box sx={{ minHeight: 'calc(100vh - 300px)'}}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export { TopbarLayout };
