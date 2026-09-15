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
    return parsed.filter(
      (item) => item && typeof item.lineId === 'string' && typeof item.id === 'string' && typeof item.qty === 'number',
    )
  } catch {
    return []
  }
}

function makeLineId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
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

  // Each add-to-cart creates its own line — a prescription is specific to one
  // order of that product, so identical products with different prescriptions
  // must stay as separate lines rather than merging quantities.
  const addItem = useCallback((productId, qty = 1, prescription = null) => {
    setItems((prev) => [...prev, { lineId: makeLineId(), id: productId, qty, prescription }])
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((lineId) => {
    setItems((prev) => prev.filter((i) => i.lineId !== lineId))
  }, [])

  const setQty = useCallback((lineId, qty) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((i) => i.lineId !== lineId)
      return prev.map((i) => (i.lineId === lineId ? { ...i, qty } : i))
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
