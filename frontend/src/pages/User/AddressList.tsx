import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { AddressCard } from "./AddressCard";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import { useSnackbar } from "notistack";
import { Address } from "../../services/endpoints/AddressEndpoint";

function AddressList() {
    const [address, setAddress] = useState<Address[]>([])
    const { user } = useAuth()
    const {enqueueSnackbar} = useSnackbar()

    useEffect(() => {
        async function getAddresses() {
            try {
                const response = await api.address.listByUserId(user?.id)
                setAddress(response.data)
            } catch (error) {
                enqueueSnackbar('Erro ao buscar endereços', { variant: 'error' })
            }
        }
        getAddresses()
    }
    , [])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Typography variant="span" fontSize={28}>Endereço</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: '5px', gap: '16px' }}>
                {address.map((address, index) => (
                    <AddressCard key={index} address={address} />
                ))}
            </Box>
        </Box>
    )
}

export { AddressList };