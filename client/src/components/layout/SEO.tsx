import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'EnglishOS'
const DEFAULT_IMAGE = 'https://englishos.app/og-image.png'
const PRODUCTION_URL = 'https://englishos.app'

interface SEOProps {
  title: string
  description?: string
  image?: string
  url?: string
  jsonLd?: Record<string, unknown>
}

export default function SEO({
  title,
  description = 'EnglishOS is an operating system for learning English — built for South Asian learners using the Polymath methodology. Reach fluency in 300 focused days.',
  image = DEFAULT_IMAGE,
  url,
  jsonLd,
}: SEOProps) {
  const canonicalUrl = url ? `${PRODUCTION_URL}${url}` : PRODUCTION_URL
  const fullTitle = title.includes(SITE_NAME) ? title : title

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD structured data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  )
}
