import { Box, Button, TextField, Typography } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import api from '../../services/api';
import { Address, AddressList } from './AddressList';

function UserPublic() {
  const initialUser = {
    name: '',
    email: '',
    password: '',
    cpf: '',
    passwordConfirm: '',
    phone: '',
  };
  const initialAddress = {
    name: '',
    cep: '',
    state: '',
    city: '',
    street: '',
    number: '',
    complement: '',
  }
  const { user, login, logout, isLogged } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRegister, setUserRegister] = useState(initialUser);
  const [adressRegister, setAddressRegister] = useState(initialAddress);
  const { enqueueSnackbar } = useSnackbar();

  async function verifyFields() {
    if (
      userRegister.name === '' ||
      userRegister.email === '' ||
      userRegister.cpf === '' ||
      userRegister.password === '' ||
      userRegister.passwordConfirm === '' ||
      userRegister.phone === ''
    ) {
      enqueueSnackbar('Preencha todos os campos', { variant: 'error' });
      return;
    }
    if (userRegister.password !== userRegister.passwordConfirm) {
      enqueueSnackbar('As senhas não conferem', { variant: 'error' });
      return;
    }
    try {
      const response = await api.user.create({
        ...userRegister,
        passwordConfirm: undefined,
      });
      enqueueSnackbar('Usuário cadastrado com sucesso, por favor faça login', {
        variant: 'success',
      });
      setUserRegister(initialUser);
    } catch (error) {
      enqueueSnackbar('Erro ao cadastrar usuário', { variant: 'error' });
    }
  }

  async function doLogin() {
    const response = await login(email, password);
    if (response) {
      enqueueSnackbar('Login efetuado com sucesso', { variant: 'success' });
    } else {
      enqueueSnackbar('Erro ao fazer login', { variant: 'error' });
    }
  }

  return (
    <Box>
      {user ? (
        <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
            width: '80vw',
          }}
        >
          <Box>
            <Typography variant="span" fontSize={28}>
              Olá, {user.name}&nbsp;
            </Typography>
            <Typography variant="span" fontSize={18}>
              ({user.email})&nbsp;&nbsp;&nbsp;
            </Typography>
            <Button
              variant="contained"
              color="error"
              sx={{ width: '100px' }}
              onClick={() => {
                logout();
              }}
            >
              Sair
            </Button>
          </Box>
          <AddressList />
        </Box>
        </>
      ) : (
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '5px',
              gap: '16px',
            }}
          >
            <Typography variant="h5">Ainda não tenho conta!</Typography>
            <TextField
              label="Nome"
              variant="outlined"
              value={userRegister.name}
              onChange={(e) =>
                setUserRegister((value) => ({ ...value, name: e.target.value }))
              }
            />
            <TextField
              label="CPF"
              variant="outlined"
              value={userRegister.cpf}
              onChange={(e) => {
                const cpfValue = e.target.value.replace(/\D/g, '');
                setUserRegister((value) => ({ ...value, cpf: cpfValue }));
              }}
            />
            <TextField
              label="E-mail"
              variant="outlined"
              value={userRegister.email}
              onChange={(e) =>
                setUserRegister((value) => ({
                  ...value,
                  email: e.target.value,
                }))
              }
            />
            <TextField
              label="Senha"
              variant="outlined"
              value={userRegister.password}
              type="password"
              onChange={(e) =>
                setUserRegister((value) => ({
                  ...value,
                  password: e.target.value,
                }))
              }
            />
            <TextField
              label="Confirmar senha"
              variant="outlined"
              value={userRegister.passwordConfirm}
              type="password"
              onChange={(e) =>
                setUserRegister((value) => ({
                  ...value,
                  passwordConfirm: e.target.value,
                }))
              }
            />
            <TextField
              label="Telefone"
              variant="outlined"
              value={userRegister.phone}
              onChange={(e) => {
                const phoneValue = e.target.value.replace(/\D/g, '');
                setUserRegister((value) => ({ ...value, phone: phoneValue }));
              }}
            />
            <Button
              variant="contained"
              color="contrast"
              onClick={() => verifyFields()}
            >
              Cadastrar
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: 'fit-content',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '5px',
              gap: '16px',
            }}
          >
            <Typography variant="h5">Já tenho conta!</Typography>
            <TextField
              label="E-mail"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="contrast"
              onClick={() => {
                doLogin();
              }}
            >
              Entrar
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export { UserPublic };
