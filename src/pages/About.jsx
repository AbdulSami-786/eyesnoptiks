import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import './About.css'

const values = [
  {
    title: 'Professional Eye Care',
    desc: 'Every recommendation is backed by proper computerized eye testing, not guesswork.',
  },
  {
    title: 'Genuine Products Only',
    desc: 'We source directly from trusted contact lens brands — no counterfeits, ever.',
  },
  {
    title: 'Honest, Fair Pricing',
    desc: 'Clear, upfront pricing on every product means no confusion and no hidden charges.',
  },
  {
    title: 'Customer-First Service',
    desc: 'From choosing a shade to after-sale support, we are one WhatsApp message away.',
  },
]

export default function About() {
  return (
    <div className="about-page">
      <SEO
        title="About Us"
        description="Eyes n Optiks is a contact lens practitioner and computerized eye testing centre in Gulshan Iqbal, Karachi, offering genuine colored contact lenses, sunglasses and eyeglasses."
        path="/about"
      />

      <div className="about-hero">
        <div className="container">
          <span className="badge badge-primary">Our Story</span>
          <h1>About Eyes n Optiks</h1>
          <p>Contact lens practitioner and computerized eye testing centre, dedicated to helping you see — and look — your best.</p>
        </div>
      </div>

      <section className="section about-intro">
        <div className="container about-intro__grid">
          <div className="about-intro__media">
            <img src="/shop-1.jpeg" alt="Eyes n Optiks storefront in Gulshan Iqbal, Karachi" />
          </div>
          <div className="about-intro__text">
            <span className="eyebrow">Who We Are</span>
            <h2>Vision Care Meets Everyday Style</h2>
            <p>
              Eyes n Optiks was built around a simple idea: getting the right
              contact lenses shouldn&rsquo;t be complicated or overpriced. As a
              registered contact lens practitioner offering computerized eye
              testing, we combine professional vision care with a curated
              range of colored contact lenses, designer-inspired sunglasses
              and prescription eyeglasses — all in one store.
            </p>
            <p>
              Whether you&rsquo;re looking for a subtle daily-wear shade, a bold
              statement colour, or a new pair of frames, our team helps you
              find the right fit, the right power, and the right look — all
              backed by proper eye testing and honest advice.
            </p>
            <Link to="/products" className="btn btn-primary">
              Explore Our Products
            </Link>
          </div>
        </div>
      </section>

      <section className="section about-values">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Why Choose Us</span>
            <h2>What We Stand For</h2>
          </div>
          <div className="about-values__grid">
            {values.map((v) => (
              <div className="about-values__card" key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <div>
            <h2>Have Questions About Lenses?</h2>
            <p>Chat with our team on WhatsApp for quick, friendly guidance.</p>
          </div>
          <Link to="/contact" className="btn btn-primary">
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
