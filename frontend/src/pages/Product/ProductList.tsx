import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import api from "../../services/api";
import UserRegister from "./ProductRegister";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Product } from "../../services/endpoints/ProductEndpoint";

function ProductList() {
    const [rows, setRows] = useState<Product[]>([])
    const [shouldReload, setShouldReload] = useState(0)
    const [open, setOpen] = useState<boolean>(false);
    const [productEdit, setProductEdit] = useState<Product | null>(null);
    const [columns, setColumns] = useState<GridColDef[]>([])

    async function handleProductDeleteRow(id: number) {
        try {
            await api.product.delete(id)
            enqueueSnackbar('Produto deletado com sucesso', { variant: 'success' })
            reload()
        } catch (error) {
            enqueueSnackbar('Erro ao deletar produto', { variant: 'error' })
        }
    }

    useEffect(() => {
        setColumns([
            { field: 'id', headerName: 'ID' },
            { field: 'name', headerName: 'Nome' },
            { field: 'description', headerName: 'Descrição' },
            { field: 'price', headerName: 'Preço' },
            { field: 'quantity', headerName: 'Quantidade' },
            { field: 'unavailable', headerName: 'Indisponível' },
            { field: 'deletedAt', headerName: 'Deletado em' },
            { field: 'action', headerName: '', sortable: false, minWidth: 150, flex: 1, renderCell: (params) => {
                const handleEdit = () => {
                    console.log(params.row)
                    setProductEdit(params.row as Product)
                    setOpen(true)
                }
                return (
                    <div>
                        <IconButton onClick={() => handleEdit(params.row)}><EditIcon /></IconButton>
                        <IconButton onClick={() => handleProductDeleteRow(params.row.id)}><DeleteIcon /></IconButton>
                    </div>
                )
            } }
        ])
    }, [])

    function reload() {
        setShouldReload((prev) => prev + 1)
      }
    
      useEffect(() => {
        async function getProducts() {
          try {
            const res = await api.product.listAll();
            setRows(res.data || [])
          } catch (error) {
            enqueueSnackbar('Erro ao buscar produtos', { variant: 'error' })
          }
        }

        getProducts()
    }, [shouldReload])

    function handleClose() {
        setOpen(false)
        reload()
      }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
            <Typography variant="h4">Lista de Produtos</Typography>
            <Button variant="contained" sx={{ marginBottom: '20px' }} onClick={() => 
                {
                    setProductEdit(null)
                    setOpen(!open)}
                }>
                Adicionar produto
            </Button>
            <UserRegister isOpen={open} setOpen={setOpen} editItem={productEdit!} handleClose={handleClose} />
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

export { ProductList };