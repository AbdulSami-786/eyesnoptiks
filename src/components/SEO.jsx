import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://eyesnoptiks.com'
const SITE_NAME = 'Eyes n Optiks'
const DEFAULT_IMAGE = `${SITE_URL}/banner2.png`

export default function SEO({
  title,
  description,
  path = '',
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
  jsonLd,
}) {
  const url = `${SITE_URL}${path}`
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Contact Lenses, Eye Testing & Eyewear`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_PK" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}

export { SITE_URL, SITE_NAME, DEFAULT_IMAGE }
