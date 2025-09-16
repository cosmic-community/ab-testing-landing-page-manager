// app/tests/[slug]/page.tsx
import { getABTest, getLandingPagesByTest } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import VariantCard from '@/components/VariantCard'
import TestStatusBadge from '@/components/TestStatusBadge'

interface TestPageProps {
  params: Promise<{ slug: string }>
}

export default async function TestPage({ params }: TestPageProps) {
  const { slug } = await params
  const test = await getABTest(slug)

  if (!test) {
    notFound()
  }

  const variants = await getLandingPagesByTest(test.id)
  const controlVariant = variants.find(v => v.metadata.variant_type.key === 'control')
  const testVariant = variants.find(v => v.metadata.variant_type.key === 'variant')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Test Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{test.metadata.test_name}</h1>
          <TestStatusBadge status={test.metadata.test_status.key} />
        </div>
        
        {test.metadata.description && (
          <p className="text-gray-600 text-lg mb-6">{test.metadata.description}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-4">
            <div className="text-sm text-gray-600 mb-1">Traffic Split</div>
            <div className="text-2xl font-semibold text-gray-900">
              {test.metadata.traffic_split || 50}% / {100 - (test.metadata.traffic_split || 50)}%
            </div>
          </div>
          
          <div className="card p-4">
            <div className="text-sm text-gray-600 mb-1">Conversion Goal</div>
            <div className="text-lg font-medium text-gray-900">
              {test.metadata.conversion_goal || 'Not specified'}
            </div>
          </div>
          
          <div className="card p-4">
            <div className="text-sm text-gray-600 mb-1">Variants</div>
            <div className="text-2xl font-semibold text-gray-900">{variants.length}</div>
          </div>
        </div>
      </div>

      {/* Variants Comparison */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Variants Comparison</h2>
        
        {variants.length === 0 ? (
          <div className="card p-8 text-center">
            <div className="text-gray-500 mb-4">No variants created for this test yet.</div>
            <p className="text-sm text-gray-400">
              Create Control (A) and Variant (B) versions to start testing.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Control Variant */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Control (A)</h3>
              {controlVariant ? (
                <VariantCard variant={controlVariant} showTestName={false} />
              ) : (
                <div className="card p-8 text-center border-2 border-dashed border-gray-300">
                  <div className="text-gray-500">No Control variant created</div>
                </div>
              )}
            </div>

            {/* Test Variant */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Variant (B)</h3>
              {testVariant ? (
                <VariantCard variant={testVariant} showTestName={false} />
              ) : (
                <div className="card p-8 text-center border-2 border-dashed border-gray-300">
                  <div className="text-gray-500">No Variant (B) created</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* All Variants List */}
      {variants.length > 2 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">All Variants</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {variants.map((variant) => (
              <VariantCard key={variant.id} variant={variant} showTestName={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}