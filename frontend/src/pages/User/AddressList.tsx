import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { AddressCard } from "./AddressCard";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import { useSnackbar } from "notistack";
import { Address } from "../../services/endpoints/AddressEndpoint";
import colors from '../../colors';

function AddressList() {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [newAddress, setNewAddress] = useState<Address>({
        street: '',
        number: '',
        city: '',
        state: '',
        userId: ''
    });
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [shouldReload, setShouldReload] = useState<number>(0);
    const { user } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        async function getAddresses() {
            try {
                const response = await api.address.listByUserId(user?.id);
                setAddresses(response.data);
            } catch (error) {
                enqueueSnackbar('Erro ao buscar endereços', { variant: 'error' });
            }
        }
        getAddresses();
    }, [user?.id, enqueueSnackbar, shouldReload]);

    function reloadAddresses() {
        setShouldReload(prevState => prevState + 1);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

  async function deleteAddress(id:number) {
    try {
      const res = await api.address.delete(id);
      enqueueSnackbar('Endereço deletado com sucesso', { variant: 'success' });
      reloadAddresses();
    } catch (error) {
      enqueueSnackbar('Erro ao deletar endereço', { variant: 'error' });
    }
  }

    const handleAddAddress = async () => {
        if (!user) {
            enqueueSnackbar('Usuário não autenticado', { variant: 'error' });
            return;
        }

        try {
            const response = await api.address.create({
                ...newAddress,
                userId: user.id
            });
            setAddresses(prevAddresses => [...prevAddresses, response.data]);
            enqueueSnackbar('Endereço adicionado com sucesso', { variant: 'success' });
            setNewAddress({
                name: '',
                cep: '',
                street: '',
                number: '',
                city: '',
                state: '',
                complement: '',
                userId: ''
            });
            setIsCreating(false);
        } catch (error) {
            enqueueSnackbar('Erro ao adicionar endereço', { variant: 'error' });
        }
    };

    return (
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            flexDirection: 'column',
            gap: '0' }}>
            
            <Typography variant="span" fontSize={28}>Endereços</Typography>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                backgroundColor: 'white',                
                borderRadius: '20px', 
                width: '600px',
                gap: '16px', 
                padding: '10px' }}>
                {addresses.map((address, index) => (
                    <AddressCard key={index} address={address} deleteAddress={deleteAddress}/>
                ))}
            </Box>

            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => setIsCreating(true)}
                sx={{ width: '200px' }}
            >
                Novo endereço
            </Button>

            {isCreating && (
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    width: '600px',
                    gap: '16px', 
                    backgroundColor: 'white', 
                    borderRadius: '20px', 
                    padding: '20px' 
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <Typography variant="subtitle1" gutterBottom>Nome do endereço</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                name="name"
                                value={newAddress.name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle1" gutterBottom>CEP</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                name="cep"
                                value={newAddress.cep}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="subtitle1" gutterBottom>Rua</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                name="street"
                                value={newAddress.street}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Typography variant="subtitle1" gutterBottom>Número</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                name="number"
                                value={newAddress.number}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <Typography variant="subtitle1" gutterBottom>Cidade</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                name="city"
                                r
                                value={newAddress.city}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography variant="subtitle1" gutterBottom>Estado</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                name="state"
                                value={newAddress.state}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="subtitle1" gutterBottom>Complemento</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                name="complement"
                                value={newAddress.complement}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>
                    <Button variant="contained" color="primary" onClick={handleAddAddress}>
                        Salvar Endereço
                    </Button>
                </Box>
            )}
        </Box>
    );
}

export { AddressList };