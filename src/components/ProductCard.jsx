import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { getCollectionBySlug } from '../data/products'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const [loaded, setLoaded] = useState(false)
  const [added, setAdded] = useState(false)
  const collection = getCollectionBySlug(product.collection)
  const { addItem } = useCart()

  function handleAddToCart() {
    addItem(product.id, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-card__media">
        {!loaded && <div className="product-card__skeleton skeleton" />}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0 }}
        />
        {collection && <span className="badge product-card__badge">{collection.name.replace(' Collection', '')}</span>}
      </Link>

      <div className="product-card__body">
        {product.brand && <span className="product-card__brand">{product.brand}</span>}
        <Link to={`/products/${product.id}`} className="product-card__name">
          {product.name}
        </Link>
        <p className="product-card__desc">{product.description}</p>

        <div className="product-card__footer">
          <span className="product-card__price">Rs. {product.price}/-</span>
          <div className="product-card__actions">
            <Link to={`/products/${product.id}`} className="btn btn-outline btn-sm">
              View
            </Link>
            <button
              type="button"
              className={`btn btn-sm ${added ? 'btn-added' : 'btn-primary'}`}
              onClick={handleAddToCart}
            >
              {added ? 'Added ✓' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}