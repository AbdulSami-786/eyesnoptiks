import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="not-found">
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist or may have been moved." path="/404" noindex />

      <div className="container not-found__inner">
        <span className="not-found__code">404</span>
        <h1>Page Not Found</h1>
        <p>The page you&rsquo;re looking for doesn&rsquo;t exist or may have been moved.</p>
        <div className="not-found__actions">
          <Link to="/" className="btn btn-primary">
            Back To Home
          </Link>
          <Link to="/products" className="btn btn-outline">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  )
}
