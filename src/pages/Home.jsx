import { Link } from 'react-router-dom'
import { products, collections } from '../data/products'
import ProductCard from '../components/ProductCard'
import './Home.css'

const BESTSELLER_IDS = [
  'diamond-diamond-brown',
  'elite-emerald-green',
  'glow-radiant-brown',
  'diamond-jade-green',
  'oneday-ocean-blue',
  'elite-midnight-blue',
  'natural-cool-grey',
  'diamond-moon-stone',
]

const bestsellers = BESTSELLER_IDS.map((id) => products.find((p) => p.id === id)).filter(Boolean)

const collectionCover = {
  diamond: products.find((p) => p.collection === 'diamond')?.image,
  elite: products.find((p) => p.collection === 'elite')?.image,
  glow: products.find((p) => p.collection === 'glow')?.image,
  natural: products.find((p) => p.collection === 'natural')?.image,
  oneday: products.find((p) => p.collection === 'oneday')?.image,
}

const features = [
  {
    title: 'Contact Lens Practitioner',
    desc: 'Professionally guided fitting and advice from an experienced contact lens practitioner.',
    icon: <LensIcon />,
  },
  {
    title: 'Computerized Eye Testing',
    desc: 'Accurate, computerized eye tests to check your prescription before you buy.',
    icon: <EyeIcon />,
  },
  {
    title: 'Genuine Quality Products',
    desc: 'Every box is sourced from trusted brands and checked for quality before it reaches you.',
    icon: <ShieldIcon />,
  },
  {
    title: 'Easy WhatsApp Ordering',
    desc: 'No confusing checkout — message us on WhatsApp and we confirm your order directly.',
    icon: <ChatIcon />,
  },
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__decor" aria-hidden="true">
          <EyeMotif />
        </div>
        <div className="container hero__inner">
          <span className="badge badge-primary hero__eyebrow">New Season Collection</span>
          <h1>
            See The World <span>In Style</span>
          </h1>
          <p>
            Premium colored contact lenses, computerized eye testing and quality
            eyewear — all under one roof at Eyes n Optiks. Every lens box priced
            at a simple flat rate of Rs. 1200/-.
          </p>
          <div className="hero__actions">
            <Link to="/products" className="btn btn-primary">
              Shop All Lenses
            </Link>
            <Link to="/contact" className="btn btn-outline-light">
              Book Eye Test
            </Link>
          </div>
        </div>
      </section>

      <section className="section trust-strip">
        <div className="container trust-strip__grid">
          {features.map((f) => (
            <div className="trust-strip__item" key={f.title}>
              <div className="trust-strip__icon">{f.icon}</div>
              <div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section collections-section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Shop By Collection</span>
            <h2>Find Your Perfect Shade</h2>
            <p>Five curated collections, every shade Rs. 1200/- per box.</p>
          </div>

          <div className="collections-grid">
            {collections.map((c) => (
              <Link key={c.slug} to={`/products?collection=${c.slug}`} className="collection-card">
                <div className="collection-card__media">
                  {collectionCover[c.slug] && <img src={collectionCover[c.slug]} alt={c.name} loading="lazy" />}
                </div>
                <div className="collection-card__body">
                  <h3>{c.name}</h3>
                  <p>{c.tagline}</p>
                  <span className="collection-card__link">Explore Collection &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bestsellers-section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Customer Favourites</span>
            <h2>Bestselling Shades</h2>
            <p>The most loved colours from our full catalog.</p>
          </div>

          <div className="product-grid">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="text-center bestsellers-section__cta">
            <Link to="/products" className="btn btn-dark">
              View Full Catalog
            </Link>
          </div>
        </div>
      </section>

      <section className="section how-it-works">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Simple Process</span>
            <h2>How To Order</h2>
            <p>No account, no complicated checkout — just three easy steps.</p>
          </div>

          <div className="how-it-works__grid">
            <div className="how-it-works__step">
              <span>1</span>
              <h3>Browse &amp; Choose</h3>
              <p>Explore our collections and pick the shade that suits you best.</p>
            </div>
            <div className="how-it-works__step">
              <span>2</span>
              <h3>Message Us</h3>
              <p>Tap &ldquo;Order on WhatsApp&rdquo; — your product details are sent to us instantly.</p>
            </div>
            <div className="how-it-works__step">
              <span>3</span>
              <h3>Confirm &amp; Receive</h3>
              <p>We confirm availability, delivery details, and get your order to you.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <div>
            <h2>Need An Eye Test First?</h2>
            <p>Visit us for a computerized eye test before picking your lens power.</p>
          </div>
          <Link to="/contact" className="btn btn-primary">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}

function EyeMotif() {
  return (
    <svg width="520" height="520" viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="98" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="76" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
      <path
        d="M10 100c30-45 60-65 90-65s60 20 90 65c-30 45-60 65-90 65s-60-20-90-65Z"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="2"
      />
      <circle cx="100" cy="100" r="34" fill="rgba(230,57,70,0.16)" stroke="rgba(230,57,70,0.5)" strokeWidth="2" />
      <circle cx="100" cy="100" r="14" fill="rgba(255,255,255,0.18)" />
    </svg>
  )
}

function LensIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <ellipse cx="12" cy="12" rx="9" ry="5.5" />
      <ellipse cx="12" cy="12" rx="4" ry="2.4" />
    </svg>
  )
}
function EyeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
function ShieldIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
function ChatIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
  )
}
