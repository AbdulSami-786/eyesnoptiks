import { useEffect, useState, useCallback } from 'react'
import './HeroCarousel.css'

const SLIDES = [
  { image: '/banner1.png', alt: 'Premium colored contact lenses — 6 stunning shades' },
  { image: '/banner2.png', alt: 'Diamond Collection — enhance your natural beauty' },
  { image: '/banner.png', alt: 'Sapphire Teens Collection eyeglasses' },
]

const AUTOPLAY_MS = 5000

export default function HeroCarousel() {
  const [index, setIndex] = useState(0)

  const goTo = useCallback((i) => {
    setIndex((i + SLIDES.length) % SLIDES.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="hero-carousel" role="region" aria-label="Featured promotions" aria-roledescription="carousel">
      <div
        className="hero-carousel__track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {SLIDES.map((slide, i) => (
          <div
            className="hero-carousel__slide"
            key={slide.image}
            aria-hidden={i !== index}
          >
            <img src={slide.image} alt={slide.alt} loading={i === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="hero-carousel__arrow hero-carousel__arrow--prev"
        onClick={() => goTo(index - 1)}
        aria-label="Previous slide"
      >
        <ChevronIcon direction="left" />
      </button>
      <button
        type="button"
        className="hero-carousel__arrow hero-carousel__arrow--next"
        onClick={() => goTo(index + 1)}
        aria-label="Next slide"
      >
        <ChevronIcon direction="right" />
      </button>

      <div className="hero-carousel__dots">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.image}
            type="button"
            className={`hero-carousel__dot ${i === index ? 'is-active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
          />
        ))}
      </div>
    </div>
  )
}

function ChevronIcon({ direction }) {
  const d = direction === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}
