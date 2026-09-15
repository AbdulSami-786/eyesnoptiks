import { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Header.css'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Shop' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { totalQty, openCart } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [])

  function handleSearch(e) {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : '/products')
    setMenuOpen(false)
  }

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="site-header__top">
        <div className="container site-header__top-inner">
          <p>Contact Lens Practitioner &amp; Computerized Eye Testing</p>
          <p className="site-header__top-price">Genuine lenses &amp; eyewear — order via WhatsApp</p>
        </div>
      </div>

      <div className="container site-header__main">
        <Link to="/" className="site-header__brand" onClick={() => setMenuOpen(false)}>
          <img src="/logo.png" alt="Eyes n Optiks logo" />
        </Link>

        <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`}>
          <ul className="site-nav__list">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) => (isActive ? 'is-active' : '')}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <form className="site-nav__search" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search lenses, sunglasses, frames..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search products"
            />
            <button type="submit" aria-label="Search">
              <SearchIcon />
            </button>
          </form>
        </nav>

        <div className="site-header__actions">
          <button
            type="button"
            className="cart-trigger"
            onClick={() => {
              openCart()
              setMenuOpen(false)
            }}
            aria-label="Open cart"
          >
            <CartIcon />
            {totalQty > 0 && <span className="cart-trigger__badge">{totalQty}</span>}
          </button>

          <Link to="/products" className="btn btn-primary btn-sm site-header__cta">
            Shop Now
          </Link>
          <button
            className={`hamburger ${menuOpen ? 'is-open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}
