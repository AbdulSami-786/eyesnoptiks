import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getProductById } from '../data/products'

const CartContext = createContext(null)
const STORAGE_KEY = 'eyesnoptiks_cart'

function readStoredCart() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item) => item && typeof item.id === 'string' && typeof item.qty === 'number')
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage unavailable (private browsing, quota) — cart still works for this session
    }
  }, [items])

  const addItem = useCallback((productId, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === productId)
      if (existing) {
        return prev.map((i) => (i.id === productId ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, { id: productId, qty }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.id !== productId))
  }, [])

  const setQty = useCallback((productId, qty) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((i) => i.id !== productId)
      return prev.map((i) => (i.id === productId ? { ...i, qty } : i))
    })
  }, [])

  const clearCart = useCallback(() => setItems([]), [])
  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const detailedItems = useMemo(
    () =>
      items
        .map((item) => {
          const product = getProductById(item.id)
          return product ? { ...item, product } : null
        })
        .filter(Boolean),
    [items],
  )

  const totalQty = useMemo(() => detailedItems.reduce((sum, i) => sum + i.qty, 0), [detailedItems])
  const totalPrice = useMemo(
    () => detailedItems.reduce((sum, i) => sum + i.qty * i.product.price, 0),
    [detailedItems],
  )

  const value = {
    items: detailedItems,
    totalQty,
    totalPrice,
    isOpen,
    addItem,
    removeItem,
    setQty,
    clearCart,
    openCart,
    closeCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
