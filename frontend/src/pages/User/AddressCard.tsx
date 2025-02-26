import { Box, Typography } from '@mui/material';
import { Address } from '../../services/endpoints/AddressEndpoint';
import colors from '../../colors';
import DeleteIcon from '@mui/icons-material/Delete';
import HouseIcon from '@mui/icons-material/House';
import { useSnackbar } from 'notistack';
import api from '../../services/api';

function AddressCard(props: { address: Address, deleteAddress: (id) => void }) {
  const { address, deleteAddress } = props;
  const {enqueueSnackbar} = useSnackbar();

  return (
    <Box
      sx={{
        border: `1px solid ${colors.contrast}`,
        borderRadius: '5px',
        display: 'flex',
        padding: '20px',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <HouseIcon sx={{ color: '#7B7B7B', width: '80px', height: '80px' }} />
        <Box
          sx={{
            display: 'flex',
            padding: '20px',
            gap: '16px',
            flexDirection: 'column',
          }}
        >
          <Typography variant="span" color="#8B8B8B" fontWeight={800}>
            {address.name}
          </Typography>
          <Typography variant="span" color="#8B8B8B" fontWeight={800}>
            {address.street}, {address.number} - {address.complement}
          </Typography>
          <Typography variant="span" color="#8B8B8B">
            {address.cep}, {address.city} - {address.state}
          </Typography>
        </Box>
      </Box>
      <DeleteIcon
        sx={{ color: 'tomato', ':hover': { cursor: 'pointer' } }}
        onClick={() => deleteAddress(address.id)}
      />
    </Box>
  );
}

export { AddressCard };
