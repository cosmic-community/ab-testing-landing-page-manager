// app/pages/[slug]/page.tsx
import { getLandingPage } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface LandingPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: LandingPageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getLandingPage(slug)

  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }

  return {
    title: page.metadata.page_title || page.metadata.hero_headline,
    description: page.metadata.meta_description || page.metadata.hero_subheadline,
  }
}

export default async function LandingPage({ params }: LandingPageProps) {
  const { slug } = await params
  const page = await getLandingPage(slug)

  if (!page || page.metadata.page_status.key !== 'live') {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Variant Badge */}
          <div className="mb-6">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              page.metadata.variant_type.key === 'control'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-purple-100 text-purple-800'
            }`}>
              {page.metadata.variant_type.value} • {page.metadata.ab_test.metadata.test_name}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {page.metadata.hero_headline}
          </h1>

          {page.metadata.hero_subheadline && (
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {page.metadata.hero_subheadline}
            </p>
          )}

          {page.metadata.cta_button_text && (
            <a
              href={page.metadata.cta_button_url || '#'}
              className="inline-flex items-center px-8 py-4 bg-primary-600 text-white text-lg font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              {page.metadata.cta_button_text}
            </a>
          )}

          {page.metadata.hero_image && (
            <div className="mt-12">
              <img
                src={`${page.metadata.hero_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                alt={page.metadata.hero_headline}
                width={600}
                height={300}
                className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl"
              />
            </div>
          )}
        </div>
      </section>

      {/* Features/Benefits Section */}
      {page.metadata.features_benefits && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="content-html prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: page.metadata.features_benefits }}
            />
          </div>
        </section>
      )}

      {/* Social Proof Section */}
      {page.metadata.social_proof && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div 
              className="content-html prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: page.metadata.social_proof }}
            />
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      {page.metadata.cta_button_text && (
        <section className="py-20 bg-primary-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to get started?
            </h2>
            <a
              href={page.metadata.cta_button_url || '#'}
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {page.metadata.cta_button_text}
            </a>
          </div>
        </section>
      )}
    </div>
  )
}