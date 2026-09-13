import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './CartDrawer.css'

export default function CartDrawer() {
  const { items, totalQty, totalPrice, isOpen, closeCart, setQty, removeItem } = useCart()

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeCart])

  if (!isOpen) return null

  return (
    <div className="cart-drawer-root">
      <div className="cart-drawer__backdrop" onClick={closeCart} />
      <aside className="cart-drawer" role="dialog" aria-label="Shopping cart">
        <div className="cart-drawer__header">
          <h2>Your Cart {totalQty > 0 && <span>({totalQty})</span>}</h2>
          <button className="cart-drawer__close" onClick={closeCart} aria-label="Close cart">
            <CloseIcon />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <BagIcon />
            <p>Your cart is empty</p>
            <Link to="/products" className="btn btn-primary" onClick={closeCart}>
              Shop Lenses
            </Link>
          </div>
        ) : (
          <>
            <ul className="cart-drawer__list">
              {items.map((item) => (
                <li key={item.id} className="cart-drawer__item">
                  <img src={item.product.image} alt={item.product.name} />
                  <div className="cart-drawer__item-info">
                    <p className="cart-drawer__item-name">{item.product.name}</p>
                    <p className="cart-drawer__item-price">Rs. {item.product.price}/-</p>
                    <div className="cart-drawer__qty">
                      <button onClick={() => setQty(item.id, item.qty - 1)} aria-label="Decrease quantity">
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => setQty(item.id, item.qty + 1)} aria-label="Increase quantity">
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="cart-drawer__remove"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.product.name}`}
                  >
                    <TrashIcon />
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-drawer__footer">
              <div className="cart-drawer__total">
                <span>Total</span>
                <span>Rs. {totalPrice}/-</span>
              </div>
              <Link to="/checkout" className="btn btn-primary btn-block" onClick={closeCart}>
                Proceed to Checkout
              </Link>
              <Link to="/products" className="btn btn-outline btn-block" onClick={closeCart}>
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}
function BagIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}
function TrashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
    </svg>
  )
}
