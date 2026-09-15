import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { buildWhatsAppLink, buildCartOrderMessage } from '../data/siteConfig'
import SEO from '../components/SEO'
import './Checkout.css'

export default function Checkout() {
  const { items, totalQty, totalPrice, setQty, removeItem, clearCart } = useCart()
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '', notes: '' })
  const [placed, setPlaced] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setCustomer((c) => ({ ...c, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const message = buildCartOrderMessage(items, totalPrice, customer)
    window.open(buildWhatsAppLink(message), '_blank', 'noreferrer')
    setPlaced(true)
    clearCart()
  }

  if (placed) {
    return (
      <div className="checkout-page">
        <SEO title="Order Confirmed" description="Your order has been sent via WhatsApp." path="/checkout" noindex />

        <div className="container checkout-success">
          <CheckIcon />
          <h1>Order Sent on WhatsApp</h1>
          <p>
            Your order details have been opened in WhatsApp. Please send the message to confirm —
            our team will get back to you shortly to finalize availability and delivery.
          </p>
          <div className="checkout-success__actions">
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
            <Link to="/" className="btn btn-outline">
              Back To Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return <Navigate to="/products" replace />
  }

  return (
    <div className="checkout-page">
      <SEO title="Checkout" description="Review your cart and confirm your order via WhatsApp." path="/checkout" noindex />

      <div className="checkout-hero">
        <div className="container">
          <span className="badge badge-primary">Checkout</span>
          <h1>Complete Your Order</h1>
          <p>Review your items, add your details, and confirm your order on WhatsApp.</p>
        </div>
      </div>

      <div className="container checkout-grid">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Delivery Details</h2>

          <label htmlFor="name">Full Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. Ayesha Khan"
            value={customer.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Phone Number *</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="e.g. 0300 1234567"
            value={customer.phone}
            onChange={handleChange}
            required
          />

          <label htmlFor="address">Delivery Address *</label>
          <textarea
            id="address"
            name="address"
            rows={3}
            placeholder="House / street, area, city"
            value={customer.address}
            onChange={handleChange}
            required
          />

          <label htmlFor="notes">Order Notes (optional)</label>
          <textarea
            id="notes"
            name="notes"
            rows={2}
            placeholder="Any special instructions..."
            value={customer.notes}
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-whatsapp btn-block">
            Confirm Order via WhatsApp
          </button>
          <p className="checkout-form__note">
            You&rsquo;ll be redirected to WhatsApp with your order pre-filled. Nothing is charged automatically —
            our team confirms payment and delivery with you directly.
          </p>
        </form>

        <div className="checkout-summary">
          <h2>Order Summary ({totalQty} item{totalQty !== 1 ? 's' : ''})</h2>
          <ul className="checkout-summary__list">
            {items.map((item) => (
              <li key={item.id} className="checkout-summary__item">
                <img src={item.product.image} alt={item.product.name} />
                <div className="checkout-summary__info">
                  <p className="checkout-summary__name">{item.product.name}</p>
                  <div className="checkout-summary__qty">
                    <button type="button" onClick={() => setQty(item.id, item.qty - 1)} aria-label="Decrease quantity">
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button type="button" onClick={() => setQty(item.id, item.qty + 1)} aria-label="Increase quantity">
                      +
                    </button>
                  </div>
                </div>
                <div className="checkout-summary__right">
                  <span className="checkout-summary__price">Rs. {item.product.price * item.qty}/-</span>
                  <button
                    type="button"
                    className="checkout-summary__remove"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.product.name}`}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="checkout-summary__total">
            <span>Total</span>
            <span>Rs. {totalPrice}/-</span>
          </div>

          <Link to="/products" className="checkout-summary__continue">
            &larr; Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#25d366" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="m8 12 3 3 5-6" />
    </svg>
  )
}
