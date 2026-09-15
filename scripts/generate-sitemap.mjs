import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { products, collections } from '../src/data/products.js'

const SITE_URL = 'https://eyesnoptiks.com'
const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = join(__dirname, '..', 'public', 'sitemap.xml')

const today = new Date().toISOString().slice(0, 10)

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/products', priority: '0.9', changefreq: 'daily' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
  { path: '/faq', priority: '0.5', changefreq: 'monthly' },
]

const collectionRoutes = collections.map((c) => ({
  path: `/products?collection=${c.slug}`,
  priority: '0.7',
  changefreq: 'weekly',
}))

const productRoutes = products.map((p) => ({
  path: `/products/${p.id}`,
  priority: '0.6',
  changefreq: 'weekly',
}))

const urls = [...staticRoutes, ...collectionRoutes, ...productRoutes]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

writeFileSync(outPath, xml)
console.log(`Sitemap written with ${urls.length} URLs to ${outPath}`)
