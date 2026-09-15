import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import {
  getProductById,
  getProductsByCollection,
  getCollectionBySlug,
  lensCollections,
} from '../data/products'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import SEO, { SITE_URL } from '../components/SEO'
import PrescriptionForm, { emptyPrescription } from '../components/PrescriptionForm'
import './ProductDetail.css'

// Contact lens collections (Diamond, Elite, Glow, Natural, One Day, Gold
// Series, US Vision Diamond) take a contact lens prescription (Sph/Cyl/Axis/
// Dia/BC/Colour per eye). Sunglasses and eyeglasses/frames take a spectacles
// prescription (Sph/Cyl/Axis for Dist/Mid/Add per eye) instead.
const LENS_COLLECTION_SLUGS = lensCollections.map((c) => c.slug)
const PRESCRIPTION_COLLECTION_SLUGS = [...LENS_COLLECTION_SLUGS, 'sunglasses', 'eyeglasses']

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProductById(id)
  const { addItem } = useCart()

  const isLens = LENS_COLLECTION_SLUGS.includes(product?.collection)
  const takesPrescription = PRESCRIPTION_COLLECTION_SLUGS.includes(product?.collection)
  const prescriptionType = isLens ? 'lens' : 'spectacle'

  const [qty, setQty] = useState(1)
  const [prescription, setPrescription] = useState(() => emptyPrescription(prescriptionType))
  const [added, setAdded] = useState(false)
  const [selectedImage, setSelectedImage] = useState(product?.image)

  // Reset selected image when product changes
  useEffect(() => {
    if (product) {
      setSelectedImage(product.image)
      setQty(1)
      setPrescription(emptyPrescription(prescriptionType))
      setAdded(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  if (!product) {
    return <Navigate to="/products" replace />
  }

  const collection = getCollectionBySlug(product.collection)

  const related = getProductsByCollection(product.collection)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  function handleAddToCart() {
    addItem(product.id, qty, takesPrescription ? prescription : null)
    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 1500)
  }

  // Support both products with multiple images and old products with only image
  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image]

  const selectedIndex = Math.max(0, productImages.indexOf(selectedImage))

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: productImages.map((img) => `${SITE_URL}${img}`),
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Eyes n Optiks',
    },
    ...(collection && { category: collection.name }),
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/products/${product.id}`,
      priceCurrency: 'PKR',
      price: product.price,
      availability: 'https://schema.org/InStock',
    },
  }

  return (
    <div className="product-detail">
      <SEO
        title={product.name}
        description={`${product.description} Rs. ${product.price}/- — order directly on WhatsApp from Eyes n Optiks.`}
        path={`/products/${product.id}`}
        image={`${SITE_URL}${product.image}`}
        type="product"
        jsonLd={productJsonLd}
      />

      <div className="container">

        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>

          <Link to="/products">Shop</Link>
          <span aria-hidden="true">/</span>

          <Link to={`/products?collection=${product.collection}`}>
            {collection?.name}
          </Link>

          <span aria-hidden="true">/</span>

          <span className="breadcrumb__current">
            {product.name}
          </span>
        </nav>

        <div className="product-detail__grid">

          {/* Product Images */}
          <div className="product-detail__media">

            {productImages.length > 1 && (
              <div className="product-detail__thumbnails" role="tablist" aria-label="Product images">
                {productImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={selectedImage === image}
                    className={`product-detail__thumbnail ${
                      selectedImage === image ? 'is-active' : ''
                    }`}
                    onClick={() => setSelectedImage(image)}
                    aria-label={`View ${product.name}, image ${index + 1}`}
                  >
                    <img
                      src={image}
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="product-detail__main-image">
              <img
                src={selectedImage}
                alt={product.name}
              />

              {productImages.length > 1 && (
                <span className="product-detail__image-count">
                  {selectedIndex + 1} / {productImages.length}
                </span>
              )}
            </div>

          </div>

          {/* Product Information */}
          <div className="product-detail__info">

            {collection && (
              <Link
                to={`/products?collection=${product.collection}`}
                className="product-detail__collection-link"
              >
                {collection.name}
              </Link>
            )}

            <h1>{product.name}</h1>

            <p className="product-detail__price">Rs. {product.price}/-</p>

            <p className="product-detail__desc">
              {product.description}
            </p>

            {product.tags?.length > 0 && (
              <ul className="product-detail__tags">
                {product.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}

            <div className="product-detail__divider" />

            {/* Quantity + Prescription + Actions */}
            <div className="product-detail__purchase">

              <div className="product-detail__qty">
                <span id="qty-label">Quantity</span>

                <div className="product-detail__qty-control" role="group" aria-labelledby="qty-label">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    disabled={qty <= 1}
                  >
                    −
                  </button>

                  <span aria-live="polite">{qty}</span>

                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {takesPrescription && (
                <div className="product-detail__prescription">
                  <PrescriptionForm type={prescriptionType} value={prescription} onChange={setPrescription} />
                </div>
              )}

              <button
                type="button"
                className={`btn btn-block ${
                  added ? 'btn-added' : 'btn-primary'
                }`}
                onClick={handleAddToCart}
              >
                {!added && <CartIcon />}
                {added ? 'Added to cart' : 'Add to cart'}
              </button>

              <Link
                to="/products"
                className="btn btn-outline btn-block"
              >
                Continue shopping
              </Link>

            </div>

            {/* Perks */}
            <div className="product-detail__perks">

              <div className="product-detail__perk">
                <ShieldIcon />
                <div>
                  <strong>Genuine &amp; sealed</strong>
                  <span>Every box ships sealed from an authorised source</span>
                </div>
              </div>

              <div className="product-detail__perk">
                <TruckIcon />
                <div>
                  <strong>WhatsApp delivery</strong>
                  <span>We&rsquo;ll confirm your order and arrange delivery directly</span>
                </div>
              </div>

              <div className="product-detail__perk">
                <SupportIcon />
                <div>
                  <strong>Practitioner support</strong>
                  <span>Questions about fit or wear? We&rsquo;re here to help</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="product-detail__related">

            <div className="product-detail__related-heading">
              <h2>More from {collection?.name}</h2>
              <Link to={`/products?collection=${product.collection}`}>
                View all
              </Link>
            </div>

            <div className="product-grid">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                />
              ))}
            </div>

          </section>
        )}

      </div>
    </div>
  )
}

/* Cart Icon */
function CartIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}

/* Shield Icon */
function ShieldIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3Z" />
    </svg>
  )
}

/* Truck Icon */
function TruckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <rect x="1" y="7" width="14" height="10" rx="1" />
      <path d="M15 10h4l3 3v4h-7z" />
      <circle cx="6" cy="19" r="1.6" />
      <circle cx="17" cy="19" r="1.6" />
    </svg>
  )
}

/* Support Icon */
function SupportIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4l3 2" />
    </svg>
  )
}