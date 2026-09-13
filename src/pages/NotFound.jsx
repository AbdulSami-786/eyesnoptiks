import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="container not-found__inner">
        <span className="not-found__code">404</span>
        <h1>Page Not Found</h1>
        <p>The page you&rsquo;re looking for doesn&rsquo;t exist or may have been moved.</p>
        <div className="not-found__actions">
          <Link to="/" className="btn btn-primary">
            Back To Home
          </Link>
          <Link to="/products" className="btn btn-outline">
            Shop Lenses
          </Link>
        </div>
      </div>
    </div>
  )
}
