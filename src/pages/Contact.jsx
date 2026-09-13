import { useState } from 'react'
import { Link } from 'react-router-dom'
import { siteConfig, buildWhatsAppLink } from '../data/siteConfig'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const lines = [
      'Hello Eyes n Optiks! I would like to get in touch.',
      '',
      `Name: ${form.name || '-'}`,
      `Phone: ${form.phone || '-'}`,
      `Message: ${form.message || '-'}`,
    ]
    window.open(buildWhatsAppLink(lines.join('\n')), '_blank', 'noreferrer')
  }

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <span className="badge badge-primary">Get In Touch</span>
          <h1>Contact Eyes n Optiks</h1>
          <p>Questions about a shade, your prescription, or an order? We&rsquo;re one message away.</p>
        </div>
      </div>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <h2>Visit or Reach Us</h2>

            <div className="contact-info__item">
              <LocationIcon />
              <div>
                <h4>Store Address</h4>
                <p>{siteConfig.address}</p>
              </div>
            </div>

            <div className="contact-info__item">
              <PhoneIcon />
              <div>
                <h4>Call / WhatsApp</h4>
                <p>
                  <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}>{siteConfig.phone}</a>
                </p>
              </div>
            </div>

            <div className="contact-info__item">
              <MailIcon />
              <div>
                <h4>Email</h4>
                <p>
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                </p>
              </div>
            </div>

            <div className="contact-info__item">
              <ClockIcon />
              <div>
                <h4>Business Hours</h4>
                {siteConfig.hours.map((h) => (
                  <p key={h.day} className="contact-info__hours">
                    <span>{h.day}</span>
                    <span>{h.time}</span>
                  </p>
                ))}
              </div>
            </div>

            <a
              href={buildWhatsAppLink('Hello Eyes n Optiks! I have a question.')}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp btn-block"
            >
              Chat On WhatsApp Now
            </a>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Send Us A Message</h2>
            <p className="contact-form__note">
              This form opens WhatsApp with your message pre-filled — nothing is stored on our server.
            </p>

            <label htmlFor="name">Your Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Ayesha Khan"
              value={form.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="e.g. 0300 1234567"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us what you&rsquo;re looking for..."
              value={form.message}
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn btn-primary btn-block">
              Send via WhatsApp
            </button>
          </form>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <div>
            <h2>Ready To Find Your Shade?</h2>
            <p>Browse our full catalog of colored contact lenses.</p>
          </div>
          <Link to="/products" className="btn btn-primary">
            Shop Lenses
          </Link>
        </div>
      </section>
    </div>
  )
}

function LocationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.36 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  )
}
function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  )
}
