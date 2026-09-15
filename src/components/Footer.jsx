import { Link } from 'react-router-dom'
import { siteConfig, buildWhatsAppLink, buildGeneralInquiryMessage } from '../data/siteConfig'
import { lensCollections, eyewearCollections } from '../data/products'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__cta">
        <div className="container site-footer__cta-inner">
          <div>
            <h3>Have a question about lenses, frames or eye testing?</h3>
            <p>Message us directly on WhatsApp — a real person replies, not a bot.</p>
          </div>
          <a
            href={buildWhatsAppLink(buildGeneralInquiryMessage())}
            target="_blank"
            rel="noreferrer"
            className="btn btn-whatsapp"
          >
            <WhatsAppIcon /> Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <img src="/logo.png" alt="Eyes n Optiks logo" />
          <p>
            Your trusted contact lens practitioner — computerized eye testing,
            premium colored contact lenses and quality eyewear, all in one place.
          </p>
          <div className="site-footer__social">
            {siteConfig.social.facebook !== '#' && (
              <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                <FacebookIcon />
              </a>
            )}
            {siteConfig.social.instagram !== '#' && (
              <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <InstagramIcon />
              </a>
            )}
            {siteConfig.social.tiktok !== '#' && (
              <a href={siteConfig.social.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok">
                <TiktokIcon />
              </a>
            )}
          </div>
        </div>

        <div className="site-footer__col">
          <h4>Contact Lenses</h4>
          <ul>
            <li><Link to="/products">All Products</Link></li>
            {lensCollections.map((c) => (
              <li key={c.slug}>
                <Link to={`/products?collection=${c.slug}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__col">
          <h4>Eyewear</h4>
          <ul>
            {eyewearCollections.map((c) => (
              <li key={c.slug}>
                <Link to={`/products?collection=${c.slug}`}>{c.name}</Link>
              </li>
            ))}
          </ul>

          <h4 className="site-footer__col-heading--spaced">Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h4>Get In Touch</h4>
          <ul className="site-footer__contact">
            <li>
              <LocationIcon />
              <span>{siteConfig.address}</span>
            </li>
            <li>
              <PhoneIcon />
              <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}>{siteConfig.phone}</a>
            </li>
            <li>
              <MailIcon />
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
          </ul>
          <div className="site-footer__hours">
            {siteConfig.hours.map((h) => (
              <div key={h.day}>
                <span>{h.day}</span>
                <span>{h.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-inner">
          <p>&copy; {year} Eyes n Optiks. All rights reserved.</p>
          <p>Orders processed via WhatsApp only.</p>
        </div>
      </div>
    </footer>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.13c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.14.82.84-3.06-.2-.31a8.2 8.2 0 0 1-1.26-4.34c0-4.54 3.7-8.24 8.26-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.4-.12-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.36-.77-1.86-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.08 0 1.23.89 2.41 1.02 2.58.12.17 1.75 2.67 4.24 3.74.59.26 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28Z" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.36 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  )
}
function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  )
}
function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  )
}
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
function TiktokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 5.82c-1.02-.9-1.6-2.16-1.6-3.5V2h-3.44v13.6a2.6 2.6 0 1 1-1.85-2.49v-3.48A5.86 5.86 0 0 0 8.6 9.4a6.06 6.06 0 1 0 6.4 6.06V9.2a8.16 8.16 0 0 0 4.75 1.52V7.29a5.6 5.6 0 0 1-3.15-1.47Z" />
    </svg>
  )
}
