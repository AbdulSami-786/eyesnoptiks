import { useState } from 'react'
import { Link } from 'react-router-dom'
import './FAQ.css'

const faqs = [
  {
    q: 'How do I place an order?',
    a: 'Browse our collections, open the product you like, and tap "Order Now on WhatsApp". This opens WhatsApp with your selected shade and price pre-filled — just send it and our team will confirm your order.',
  },
  {
    q: 'Is every lens really Rs. 1200/-?',
    a: 'Yes. Every box across all five collections — Diamond, Elite, Glow, Natural and One Day — is priced at a flat Rs. 1200/-, so there is no confusion when choosing a shade.',
  },
  {
    q: 'Do I need an eye test before buying colored lenses?',
    a: 'We strongly recommend a computerized eye test first, especially if you plan to wear lenses regularly. Visit our store or message us on WhatsApp to book a test.',
  },
  {
    q: 'How long do the lenses last?',
    a: 'Our Diamond, Elite, Glow and Natural collections are monthly-wear lenses, while our One Day Collection is designed for single daily use. Always follow the usage guidance on your box.',
  },
  {
    q: 'How do I pay for my order?',
    a: 'Payment details are shared and confirmed directly over WhatsApp once your order is placed, along with delivery or pickup arrangements.',
  },
  {
    q: 'Can I return or exchange a product?',
    a: 'Please contact us on WhatsApp as soon as possible if there is an issue with your order. Sealed hygiene products like contact lenses can only be exchanged if there is a genuine defect.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="faq-page">
      <div className="faq-hero">
        <div className="container">
          <span className="badge badge-primary">Help Center</span>
          <h1>Frequently Asked Questions</h1>
          <p>Everything you need to know about ordering, pricing and lens care.</p>
        </div>
      </div>

      <section className="section">
        <div className="container faq-list">
          {faqs.map((item, i) => (
            <div className={`faq-item ${openIndex === i ? 'is-open' : ''}`} key={item.q}>
              <button className="faq-item__question" onClick={() => setOpenIndex(openIndex === i ? -1 : i)}>
                {item.q}
                <ChevronIcon />
              </button>
              {openIndex === i && <p className="faq-item__answer">{item.a}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <div>
            <h2>Still Have Questions?</h2>
            <p>Our team is happy to help you over WhatsApp.</p>
          </div>
          <Link to="/contact" className="btn btn-primary">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}

function ChevronIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
