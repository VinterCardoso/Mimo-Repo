import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react'
import { enqueueSnackbar, useSnackbar } from 'notistack'
import api from '../services/api'
import { Product } from '../services/endpoints/ProductEndpoint'
import { User } from '../services/endpoints/UserEndpoint'

type AuthData = {
    user: User | null,
    isLoading: boolean,
    isLogged: boolean,
    login: (email: string, password: string) => void,
    logout: () => void,
}

export const AuthContext = createContext<AuthData>({} as AuthData)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isLogged, setIsLogged] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const {enqueueSnackbar} = useSnackbar()

    useEffect(() => {
        const user = localStorage.getItem('@petfood:user')
        if (user) {
            setUser(JSON.parse(user))
            setIsLogged(true)
        }
        setIsLoading(false)
    }, [])

    async function login(email: string, password: string) {
        setIsLoading(true)
        try {
            const response = await api.user.login(email, password)
            const user = response.data.user
            console.log(response)
            setUser(user)
            setIsLogged(true)
            localStorage.setItem('@petfood:user', JSON.stringify(user))
            return true
        } catch (error) {
            enqueueSnackbar('Erro ao fazer login', { variant: 'error' })
            return false
        } finally {
            setIsLoading(false)
        }
    }

    async function logout() {
        try {
            localStorage.removeItem('@petfood:user')
            setUser(null)
            setIsLogged(false)
        } catch (error) {
            enqueueSnackbar('Erro ao fazer logout', { variant: 'error' })
        }
    }

  const value = useMemo(
    () => ({
        user,
        isLoading,
        isLogged,
        login,
        logout,
    }),
    [user, isLoading, isLogged],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}