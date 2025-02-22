import { Box, Button, TextField, Typography, IconButton, Dialog, DialogTitle, DialogActions, DialogContent, Select, MenuItem, InputLabel } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import CloseIcon from '@mui/icons-material/Close'
import useHandleKeyPress from '../../hooks/useHandleKeyPress'
import api from '../../services/api'
import { Product } from '../../services/endpoints/ProductEndpoint'

interface IModal {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
  editItem: Product
}

function ProductRegister({ isOpen, setOpen, editItem }: IModal) {
    console.log(editItem)
  const [product, setProduct] = useState<Product>(editItem || {
    name: '',
    description: '',
    price: '',
    quantity: '',
    unavailable: false,
    deletedAt: null
  })
  const { enqueueSnackbar } = useSnackbar()
  const isEdit = !!editItem

  async function submit() {
    if (isEdit) {
      try {
        await api.product.update(product.id!, product)
        enqueueSnackbar('Produto editado com sucesso', {
          variant: 'success',
        })
      } catch (error) {
        enqueueSnackbar('Erro ao editar produto', { variant: 'error' })
      }
      return
    }
    try {
      await api.product.create({...product,quantity:+product.quantity,price:+product.price})
      enqueueSnackbar('Produto adicionado com sucesso', {
        variant: 'success',
      })
    } catch (error) {
      console.log(error)
      enqueueSnackbar('Erro ao adicionar produto', { variant: 'error' })
    }
  }

  const handleKeyPress = useHandleKeyPress({
    verification: Object.values(product).every((value) => value.length > 0),
    key: 'Enter',
    callback: () => submit(),
  })

  function setProductValue(value: string, field: string) {
    setProduct({ ...product, [field]: value })
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  return (
    <Dialog open={isOpen}>
      <DialogTitle>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">
            {isEdit ? 'Editar' : 'Adicionar'}
            {' '}
            produto
          </Typography>
          <IconButton onClick={() => setOpen(!isOpen)}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ width: '340px', display: 'flex', gap: '8px', flexDirection: 'column', paddingTop: '8px' }}>
          <TextField
            variant="outlined"
            placeholder="Digite o nome do produto"
            label="Nome do produto"
            value={product.name}
            onChange={(e) => setProductValue(e.target.value, 'name')}
            sx={{ width: '100%' }}
          />
          <TextField
            variant="outlined"
            placeholder="Descrição"
            label="Descrição"
            value={product.description}
            onChange={(e) => setProductValue(e.target.value, 'description')}
            sx={{ width: '100%' }}
          />
          <TextField
            variant="outlined"
            placeholder="Preço"
            label="Preço"
            value={product.price}
            onChange={(e) => setProductValue(e.target.value, 'price')}
            sx={{ width: '100%' }}
          />
          <TextField
            variant="outlined"
            placeholder="Quantidade"
            label="Quantidade"
            value={product.quantity}
            onChange={(e) => setProductValue(e.target.value, 'quantity')}
            sx={{ width: '100%' }}
          />
            
        </Box>
      </DialogContent>
      <DialogActions>
        <Box sx={{ padding: '0px 16px 8px 0px' }}>
          <Button
            variant="contained"
            // disabled={!Object.values(product).every((value) => value.length > 0)}
            onClick={() => submit()}
          >
            {isEdit ? 'Salvar' : 'Adicionar'}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default ProductRegister