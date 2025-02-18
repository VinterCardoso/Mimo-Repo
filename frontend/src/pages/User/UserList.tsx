import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { User } from "../../services/endpoints/UserEndpoint";
import { enqueueSnackbar } from "notistack";
import api from "../../services/api";
import UserRegister from "./UserRegister";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function UserList() {
    const [rows, setRows] = useState<User[]>([])
    const [shouldReload, setShouldReload] = useState(0)
    const [open, setOpen] = useState<boolean>(false);
    const [userEdit, setUserEdit] = useState<User | null>(null);
    const [columns, setColumns] = useState<GridColDef[]>([])

    async function handleUserDeleteRow(id: number) {
        try {
            await api.user.delete(id)
            enqueueSnackbar('Usuário deletado com sucesso', { variant: 'success' })
            reload()
        } catch (error) {
            enqueueSnackbar('Erro ao deletar usuário', { variant: 'error' })
        }
    }

    useEffect(() => {
        setColumns([
            { field: 'id', headerName: 'ID' },
            { field: 'name', headerName: 'Nome' },
            { field: 'email', headerName: 'Email' },
            { field: 'role', headerName: 'Cargo' },
            { field: 'action', headerName: '', sortable: false, minWidth: 150, flex: 1, renderCell: (params) => {
                const handleEdit = () => {
                    console.log(params.row)
                    setUserEdit(params.row as User)
                    setOpen(true)
                }
                return (
                    <div>
                        <IconButton onClick={() => handleEdit(params.row)}><EditIcon /></IconButton>
                        <IconButton onClick={() => handleUserDeleteRow(params.row.id)}><DeleteIcon /></IconButton>
                    </div>
                )
            } }
        ])
    }, [])

    function reload() {
        setShouldReload((prev) => prev + 1)
      }
    
      useEffect(() => {
        async function getUsers() {
          try {
            const res = await api.user.listAll();
            setRows(res.data || [])
          } catch (error) {
            enqueueSnackbar('Erro ao buscar usuários', { variant: 'error' })
          }
        }

        getUsers()
    }, [shouldReload])

    function handleClose() {
        setOpen(false)
        reload()
      }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
            <Typography variant="h4">Lista de Usuários</Typography>
            <Button variant="contained" sx={{ marginBottom: '20px' }} onClick={() => 
                {
                    setUserEdit(null)
                    setOpen(!open)}
                }>
                Adicionar usuário
            </Button>
            <UserRegister isOpen={open} setOpen={setOpen} editItem={userEdit!} handleClose={handleClose} />
            <Box>
                <DataGrid
                    sx={{ height: '600px', width: '500px' }}
                    // columnVisibilityModel={{
                    //   id: false,
                    // }}
                    rows={rows}
                    columns={columns}
                    initialState={{ pinnedColumns: { right: ['actions'] } }}
                    >
                        </DataGrid>
                </Box>
        </Box>
    )
}

export { UserList };