import { createContext, useState, useContext, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchCart()
    } else {
      setCartItems([])
    }
  }, [user])

  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get('/cart')
      setCartItems(response.data.items || [])
    } catch (error) {
      console.error('Failed to fetch cart', error)
    }
  }

  const addToCart = async (product) => {
    if (user) {
      try {
        const response = await axiosInstance.post('/cart', { productId: product.id, quantity: 1 })
        setCartItems(response.data.items || [])
      } catch (error) {
        console.error('Failed to add to cart', error)
      }
    } else {
      setCartItems(prev => {
        const existing = prev.find(item => item.id === product.id)
        if (existing) {
          return prev.map(item => item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item)
        }
        return [...prev, { ...product, quantity: 1 }]
      })
    }
  }

  const updateQuantity = async (itemId, quantity) => {
    if (user) {
      try {
        const response = await axiosInstance.put(`/cart/${itemId}`, { quantity })
        setCartItems(response.data.items || [])
      } catch (error) {
        console.error('Failed to update cart', error)
      }
    } else {
      setCartItems(prev =>
        quantity <= 0
          ? prev.filter(item => item.id !== itemId)
          : prev.map(item => item.id === itemId ? { ...item, quantity } : item)
      )
    }
  }

  const removeFromCart = async (itemId) => {
    if (user) {
      try {
        const response = await axiosInstance.delete(`/cart/${itemId}`)
        setCartItems(response.data.items || [])
      } catch (error) {
        console.error('Failed to remove from cart', error)
      }
    } else {
      setCartItems(prev => prev.filter(item => item.id !== itemId))
    }
  }

  const clearCart = () => setCartItems([])

  const getCartTotal = () =>
    cartItems.reduce((total, item) => {
      const price = item.product ? item.product.price : item.price
      return total + (price * item.quantity)
    }, 0)

  const getTotalItems = () =>
    cartItems.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}