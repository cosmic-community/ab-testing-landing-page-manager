import Link from 'next/link'
import type { LandingPage } from '@/types'

interface VariantCardProps {
  variant: LandingPage
  showTestName?: boolean
}

export default function VariantCard({ variant, showTestName = true }: VariantCardProps) {
  const isLive = variant.metadata.page_status.key === 'live'

  return (
    <div className="card overflow-hidden">
      {/* Hero Image */}
      {variant.metadata.hero_image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={`${variant.metadata.hero_image.imgix_url}?w=600&h=300&fit=crop&auto=format,compress`}
            alt={variant.metadata.hero_headline}
            width={300}
            height={150}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6">
        {/* Variant Type Badge */}
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            variant.metadata.variant_type.key === 'control'
              ? 'variant-control'
              : 'variant-variant'
          }`}>
            {variant.metadata.variant_type.value}
          </span>
          
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            variant.metadata.page_status.key === 'live'
              ? 'bg-success-100 text-success-600'
              : variant.metadata.page_status.key === 'draft'
              ? 'bg-gray-100 text-gray-600'
              : 'bg-warning-100 text-warning-600'
          }`}>
            {variant.metadata.page_status.value}
          </span>
        </div>

        {/* Test Name */}
        {showTestName && (
          <div className="text-sm text-gray-500 mb-2">
            {variant.metadata.ab_test.metadata.test_name}
          </div>
        )}

        {/* Page Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {variant.metadata.page_name}
        </h3>

        {/* Hero Headline */}
        <p className="text-gray-600 mb-4 line-clamp-2">
          {variant.metadata.hero_headline}
        </p>

        {/* CTA Preview */}
        {variant.metadata.cta_button_text && (
          <div className="mb-4">
            <span className="text-xs text-gray-500 block mb-1">Call to Action:</span>
            <span className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-600 text-sm rounded-md">
              {variant.metadata.cta_button_text}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          {isLive && (
            <Link
              href={`/pages/${variant.slug}`}
              className="flex-1 btn btn-primary text-center"
            >
              View Live
            </Link>
          )}
          <Link
            href={`/tests/${variant.metadata.ab_test.slug}`}
            className={`${isLive ? 'btn-secondary' : 'flex-1 btn-primary text-center'}`}
          >
            View Test
          </Link>
        </div>
      </div>
    </div>
  )
}