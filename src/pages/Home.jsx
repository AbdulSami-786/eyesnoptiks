import { Link } from 'react-router-dom'
import { products, lensCollections, eyewearCollections } from '../data/products'
import ProductCard from '../components/ProductCard'
import HeroCarousel from '../components/HeroCarousel'
import SEO, { SITE_URL } from '../components/SEO'
import { siteConfig } from '../data/siteConfig'
import './Home.css'

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'OpticalStore',
  name: siteConfig.brandName,
  description:
    'Contact lens practitioner and computerized eye testing centre offering premium colored contact lenses, sunglasses and eyeglasses.',
  url: SITE_URL,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  image: `${SITE_URL}/banner2.png`,
  logo: `${SITE_URL}/logo.png`,
  priceRange: 'Rs. 1200 - Rs. 4900',
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address,
    addressLocality: 'Karachi',
    addressCountry: 'PK',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '11:00',
      closes: '21:00',
    },
  ],
  sameAs: Object.values(siteConfig.social).filter((url) => url !== '#'),
}

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

function coverFor(slug) {
  return products.find((p) => p.collection === slug)?.image
}

const eyewearCollage = {
  sunglasses: ['/products/sun1-1.jpeg', '/products/sun2-1.jpeg', '/products/sun3-1.jpeg', '/products/sun6-1.jpeg'],
  eyeglasses: ['/products/fra11-2.jpeg', '/products/fra1-2.jpeg', '/products/fra5-2.jpeg', '/products/fra16-1.jpeg'],
}

const testimonials = [
  {
    name: 'Ayesha K.',
    location: 'Gulshan Iqbal, Karachi',
    rating: 5,
    quote:
      'Got my eyes tested and picked out the Diamond Brown lenses the same day. The staff explained everything about lens care before I left — very professional setup.',
  },
  {
    name: 'Hamza R.',
    location: 'Karachi',
    rating: 5,
    quote:
      'Ordered a Ray-Ban style browline frame over WhatsApp and it was confirmed within minutes. Genuine product, exactly as shown in photos.',
  },
  {
    name: 'Sana M.',
    location: 'Karachi',
    rating: 5,
    quote:
      'Been buying my monthly lenses here for over a year. Prices are fair and they always have my shade in stock. Highly recommend the Elite collection.',
  },
]

const galleryImages = [
  { src: '/products/product_04.jpeg', alt: 'Model wearing Diamond Brown colored contact lens' },
  { src: '/products/sun3-1.jpeg', alt: 'Ray-Ban style black and green browline sunglasses' },
  { src: '/products/product_21.jpeg', alt: 'Model wearing Emerald Green colored contact lens' },
  { src: '/products/fra1-2.jpeg', alt: 'Sapphire Teens crystal pink eyeglasses frame' },
  { src: '/products/product_36.jpeg', alt: 'Model wearing Radiant Brown colored contact lens' },
  { src: '/products/sun6-1.jpeg', alt: 'Tom Ford style grey translucent square sunglasses' },
]

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
      <SEO
        title="Contact Lenses, Sunglasses &amp; Eyeglasses in Karachi"
        description="Shop premium colored contact lenses, designer-inspired sunglasses and eyeglasses at Eyes n Optiks — a contact lens practitioner and computerized eye testing store in Gulshan Iqbal, Karachi. Order easily via WhatsApp."
        path="/"
        jsonLd={localBusinessJsonLd}
      />

      <section className="hero">
        <HeroCarousel />
        <div className="container hero__strip">
          <span className="badge badge-primary">New Season Collection</span>
          <h1>
            See The World <span>In Style</span>
          </h1>
          <p>
            Premium colored contact lenses, computerized eye testing and quality
            eyewear — all under one roof at Eyes n Optiks.
          </p>
          <div className="hero__actions">
            <Link to="/products" className="btn btn-primary">
              Shop All Lenses
            </Link>
            <Link to="/contact" className="btn btn-outline">
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
            <p>Curated collections for every look, from everyday wear to bold statement shades.</p>
          </div>

          <div className="collections-grid">
            {lensCollections.map((c) => (
              <Link key={c.slug} to={`/products?collection=${c.slug}`} className="collection-card">
                <div className="collection-card__media">
                  {coverFor(c.slug) && <img src={coverFor(c.slug)} alt={c.name} loading="lazy" />}
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

      <section className="section eyewear-section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Sunglasses &amp; Frames</span>
            <h2>Complete Your Look</h2>
            <p>Designer-inspired sunglasses and prescription frames for every style.</p>
          </div>

          <div className="collections-grid collections-grid--eyewear">
            {eyewearCollections.map((c) => (
              <Link key={c.slug} to={`/products?collection=${c.slug}`} className="collection-card collection-card--collage">
                <div className="collection-card__collage">
                  {(eyewearCollage[c.slug] || []).map((src) => (
                    <img key={src} src={src} alt="" loading="lazy" />
                  ))}
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

          <div className="bestsellers-scroll">
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

      <section className="section gallery-section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Real Looks</span>
            <h2>Styled By Our Customers</h2>
            <p>A closer look at our lenses and eyewear, on real faces.</p>
          </div>

          <div className="gallery-grid">
            {galleryImages.map((img) => (
              <div className="gallery-grid__item" key={img.src}>
                <img src={img.src} alt={img.alt} loading="lazy" />
              </div>
            ))}
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

      <section className="section store-section">
        <div className="container store-section__grid">
          <div className="store-section__photos">
            <img src="/shop-1.jpeg" alt="Eyes n Optiks storefront in Gulshan Iqbal, Karachi" loading="lazy" className="store-section__photo store-section__photo--main" />
            <img src="/shop-2.jpeg" alt="Sunglasses and eyeglasses display wall inside Eyes n Optiks store" loading="lazy" className="store-section__photo" />
            <img src="/shop-3.jpeg" alt="Computerized eye testing room at Eyes n Optiks" loading="lazy" className="store-section__photo" />
          </div>
          <div className="store-section__content">
            <span className="eyebrow">Visit Us</span>
            <h2>A Real Store You Can Walk Into</h2>
            <p>
              Eyes n Optiks is a physical optical store in Gulshan Iqbal, Karachi — not just a
              catalog. Come in for a computerized eye test, try on frames in person, or get expert
              advice on the right lens shade and power for your eyes.
            </p>
            <ul className="store-section__list">
              <li><ShieldIcon /> Genuine, sealed products only</li>
              <li><EyeIcon /> On-site computerized eye testing</li>
              <li><LensIcon /> Practitioner-guided lens fitting</li>
            </ul>
            <Link to="/contact" className="btn btn-primary">
              Get Directions &amp; Contact
            </Link>
          </div>
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Customer Reviews</span>
            <h2>What Our Customers Say</h2>
            <p>Real feedback from shoppers who visited our store or ordered on WhatsApp.</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <figure className="testimonial-card" key={t.name}>
                <div className="testimonial-card__stars" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  <span>{t.location}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section faq-preview-section">
        <div className="container faq-preview__grid">
          <div className="faq-preview__trust">
            <h2>Why Shop With Us</h2>
            <ul className="faq-preview__badges">
              <li><ShieldIcon /> <span>100% genuine, authorised products</span></li>
              <li><EyeIcon /> <span>Practitioner-verified fitting advice</span></li>
              <li><ChatIcon /> <span>Secure, direct WhatsApp ordering</span></li>
            </ul>
          </div>

          <div className="faq-preview__questions">
            <h3>Common Questions</h3>
            <div className="faq-preview__list">
              <Link to="/faq" className="faq-preview__item">
                <span>How much do the lenses cost?</span>
                <ArrowIcon />
              </Link>
              <Link to="/faq" className="faq-preview__item">
                <span>Do I need an eye test before buying colored lenses?</span>
                <ArrowIcon />
              </Link>
              <Link to="/faq" className="faq-preview__item">
                <span>How do I place an order?</span>
                <ArrowIcon />
              </Link>
            </div>
            <Link to="/faq" className="btn btn-outline">
              View All FAQs
            </Link>
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
function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="m12 2 2.9 6.6 7.1.7-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7-5.4-4.7 7.1-.7Z" />
    </svg>
  )
}
function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}
