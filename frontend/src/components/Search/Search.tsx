import { Box, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Search() {
  return (
    <Box>
      <TextField
        sx={{ width: '450px' }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ width: '16px', height: '16px' }} />
              </InputAdornment>
            ),
          },
        }}
        label="O que o seu pet precisa?"
      />
    </Box>
  );
}

export { Search };
