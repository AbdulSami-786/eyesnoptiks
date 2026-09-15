import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products, lensCollections, eyewearCollections, getCollectionBySlug } from '../data/products'
import ProductCard from '../components/ProductCard'
import SEO from '../components/SEO'
import './Products.css'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCollection = searchParams.get('collection') || 'all'
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const [sort, setSort] = useState('featured')

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
  }, [searchParams])

  function setCollection(slug) {
    const next = new URLSearchParams(searchParams)
    if (slug === 'all') next.delete('collection')
    else next.set('collection', slug)
    setSearchParams(next)
  }

  const filtered = useMemo(() => {
    let list = products
    if (activeCollection !== 'all') {
      list = list.filter((p) => p.collection === activeCollection)
    }
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      )
    }
    if (sort === 'name-asc') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    } else if (sort === 'name-desc') {
      list = [...list].sort((a, b) => b.name.localeCompare(a.name))
    }
    return list
  }, [activeCollection, query, sort])

  const activeCollectionMeta = activeCollection !== 'all' ? getCollectionBySlug(activeCollection) : null
  const seoTitle = activeCollectionMeta ? activeCollectionMeta.name : 'Shop Lenses, Sunglasses & Eyeglasses'
  const seoDescription = activeCollectionMeta
    ? `Shop ${activeCollectionMeta.name} at Eyes n Optiks — ${activeCollectionMeta.tagline.toLowerCase()}. Genuine products, ordered directly on WhatsApp.`
    : 'Browse the full Eyes n Optiks catalog — colored contact lenses, sunglasses and eyeglasses. Genuine, sealed products ordered directly on WhatsApp.'
  const seoPath = activeCollection !== 'all' ? `/products?collection=${activeCollection}` : '/products'

  return (
    <div className="products-page">
      <SEO title={seoTitle} description={seoDescription} path={seoPath} />

      <div className="products-hero">
        <div className="container">
          <span className="badge badge-primary">Full Catalog</span>
          <h1>Shop Lenses, Sunglasses &amp; Frames</h1>
          <p>Browse every shade and collection — genuine, sealed products, ordered directly on WhatsApp.</p>
        </div>
      </div>

      <div className="container products-layout">
        <aside className="products-filters">
          <ul className="filter-list">
            <li>
              <button
                className={activeCollection === 'all' ? 'is-active' : ''}
                onClick={() => setCollection('all')}
              >
                All Products
                <span>{products.length}</span>
              </button>
            </li>
          </ul>

          <h3 className="filter-group-heading">Contact Lenses</h3>
          <ul className="filter-list">
            {lensCollections.map((c) => {
              const count = products.filter((p) => p.collection === c.slug).length
              return (
                <li key={c.slug}>
                  <button
                    className={activeCollection === c.slug ? 'is-active' : ''}
                    onClick={() => setCollection(c.slug)}
                  >
                    {c.name}
                    <span>{count}</span>
                  </button>
                </li>
              )
            })}
          </ul>

          <h3 className="filter-group-heading">Eyewear</h3>
          <ul className="filter-list">
            {eyewearCollections.map((c) => {
              const count = products.filter((p) => p.collection === c.slug).length
              return (
                <li key={c.slug}>
                  <button
                    className={activeCollection === c.slug ? 'is-active' : ''}
                    onClick={() => setCollection(c.slug)}
                  >
                    {c.name}
                    <span>{count}</span>
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="filter-note">
            <h4>Need help choosing?</h4>
            <p>Message us on WhatsApp and we&rsquo;ll help you pick the right shade, frame or lens type for your eyes.</p>
          </div>
        </aside>

        <div className="products-main">
          <div className="products-toolbar">
            <div className="products-search">
              <SearchIcon />
              <input
                type="search"
                placeholder="Search by name, e.g. Grey, Ray-Ban, Aviator..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="products-sort">
              <label htmlFor="sort">Sort:</label>
              <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>

          <p className="products-count">{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>

          {filtered.length > 0 ? (
            <div className="product-grid">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="products-empty">
              <h3>No products match your search</h3>
              <p>Try a different keyword or clear your filters.</p>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setQuery('')
                  setCollection('all')
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
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
