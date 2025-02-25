import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react'
import { enqueueSnackbar } from 'notistack'
import api from '../services/api'
import { Product } from '../services/endpoints/ProductEndpoint'

export type CartItem = {
    product: Product
    quantity: number
}

type CartData = {
    cart: CartItem[]
    addToCart: (product: Product) => void
    removeFromCart: (product: Product) => void
    cartSubTotal: number
    isLoading: boolean
    finalizeOrder: () => void
    success: boolean
    setSuccess: (success: boolean) => void
}

export const CartContext = createContext<CartData>({} as CartData)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [success, setSuccess] = useState<boolean>(false)

    useEffect(() => {
        const cart = localStorage.getItem('@petfood:cart')
        if (cart) {
            setCart(JSON.parse(cart))
        }
        setIsLoading(false)
    }, [])

    const addToCart = useCallback((product: Product) => {
        const productIndex = cart.findIndex((item) => item.product.id === product.id)
        if (productIndex === -1) {
            setCart([...cart, { product, quantity: 1 }])
        } else {
            cart[productIndex].quantity += 1
            setCart([...cart])
        }
        console.log(cart)
        localStorage.setItem('@petfood:cart', JSON.stringify(cart))
    }, [cart])

    const removeFromCart = useCallback((product: Product) => {
        const productIndex = cart.findIndex((item) => item.product.id === product.id)
        if (productIndex !== -1) {
            if (cart[productIndex].quantity === 1) {
                cart.splice(productIndex, 1)
                setCart([...cart])
            } else {
                cart[productIndex].quantity -= 1
                setCart([...cart])
            }
        }
        localStorage.setItem('@petfood:cart', JSON.stringify(cart))
    }, [cart])

    const cartSubTotal = useMemo(() => {
        return cart.reduce((acc, item) => {
            return acc + item.product.price * item.quantity
        }, 0)
    }
    , [cart])

    async function finalizeOrder() {
        setIsLoading(true)
        try{

            const order = {
                cart: cart.map((item) => ({
                    productId: item.product.id,
                    quantity: item.quantity,
                })),
                total: cartSubTotal,
                userId: 1,
            }
            await api.order.create(order)
            enqueueSnackbar('Pedido finalizado com sucesso', { variant: 'success' })
            setSuccess(true)
            setCart([])
            localStorage.removeItem('@petfood:cart')
        } catch (error) {
            enqueueSnackbar('Erro ao finalizar pedido', { variant: 'error' })
        } finally {
            setIsLoading(false)
        }
    }

  const value = useMemo(
    () => ({
        cart,
        addToCart,
        removeFromCart,
        cartSubTotal,
        isLoading,
        finalizeOrder,
        success,
        setSuccess,
    }),
    [cart, addToCart, removeFromCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  return useContext(CartContext)
}