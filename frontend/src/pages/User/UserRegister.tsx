import { Box, Button, TextField, Typography, IconButton, Dialog, DialogTitle, DialogActions, DialogContent, Select, MenuItem, InputLabel } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import CloseIcon from '@mui/icons-material/Close'
import useHandleKeyPress from '../../hooks/useHandleKeyPress'
import api from '../../services/api'
import { User } from '../../services/endpoints/UserEndpoint'

interface IModal {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
  editItem: User
}

function UserRegister({ isOpen, setOpen, editItem }: IModal) {
    console.log(editItem)
  const [user, setUser] = useState<User>(editItem || {
    name: '',
    email: '',
    role: 'USER'
  })
  const { enqueueSnackbar } = useSnackbar()
  const isEdit = !!editItem

  async function submit() {
    if (isEdit) {
      try {
        await api.user.update(user.id!, user)
        enqueueSnackbar('Usuário editado com sucesso', {
          variant: 'success',
        })
      } catch (error) {
        enqueueSnackbar('Erro ao editar usuário', { variant: 'error' })
      }
      return
    }
    try {
      await api.user.create(user)
      enqueueSnackbar('Usuário adicionado com sucesso', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Erro ao adicionar usuário', { variant: 'error' })
    }
  }

  const handleKeyPress = useHandleKeyPress({
    verification: Object.values(user).every((value) => value.length > 0),
    key: 'Enter',
    callback: () => submit(),
  })

  function setUserValue(value: string, field: string) {
    setUser({ ...user, [field]: value })
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
            usuário
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
            placeholder="Digite o Nome"
            label="Nome"
            value={user.name}
            onChange={(e) => setUserValue(e.target.value, 'name')}
            sx={{ width: '100%' }}
          />
          <TextField
            variant="outlined"
            placeholder="Digite o E-mail"
            label="E-mail"
            value={user.email}
            onChange={(e) => setUserValue(e.target.value, 'email')}
            sx={{ width: '100%' }}
          />
          <Box>
            <TextField
                value={user.role}
                select
                onChange={(e) => setUserValue(e.target.value as string, 'role')}
                sx={{ width: '100%' }}
                label="Cargo"
                >
                    <MenuItem value="USER">Usuário</MenuItem>
                    <MenuItem value="ADMIN">Administrador</MenuItem>
                </TextField>
            </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box sx={{ padding: '0px 16px 8px 0px' }}>
          <Button
            variant="contained"
            disabled={!Object.values(user).every((value) => value.length > 0)}
            onClick={() => submit()}
          >
            {isEdit ? 'Salvar' : 'Adicionar'}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default UserRegister