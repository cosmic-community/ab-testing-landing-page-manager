import { getABTests, getLandingPages } from '@/lib/cosmic'
import TestCard from '@/components/TestCard'
import VariantCard from '@/components/VariantCard'
import EmptyState from '@/components/EmptyState'

export default async function HomePage() {
  const [tests, landingPages] = await Promise.all([
    getABTests(),
    getLandingPages()
  ])

  const runningTests = tests.filter(test => test.metadata.test_status.key === 'running')
  const livePages = landingPages.filter(page => page.metadata.page_status.key === 'live')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          A/B Testing Dashboard
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Create, manage, and optimize multiple landing page variants to maximize your conversion rates
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">{tests.length}</div>
          <div className="text-sm text-gray-600">Total Tests</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-success-600 mb-2">{runningTests.length}</div>
          <div className="text-sm text-gray-600">Running Tests</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">{landingPages.length}</div>
          <div className="text-sm text-gray-600">Landing Pages</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">{livePages.length}</div>
          <div className="text-sm text-gray-600">Live Pages</div>
        </div>
      </div>

      {/* A/B Tests Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Active A/B Tests</h2>
          <a href="/tests" className="btn-primary">
            View All Tests
          </a>
        </div>

        {tests.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tests.slice(0, 4).map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No A/B Tests Found"
            description="Create your first A/B test to start optimizing your landing pages."
            action="Create Test"
            href="/tests"
          />
        )}
      </section>

      {/* Recent Landing Pages */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Recent Landing Pages</h2>
          <a href="/pages" className="btn-primary">
            View All Pages
          </a>
        </div>

        {landingPages.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {landingPages.slice(0, 6).map((page) => (
              <VariantCard key={page.id} variant={page} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Landing Pages Found"
            description="Create your first landing page variant to start testing."
            action="Create Page"
            href="/pages"
          />
        )}
      </section>
    </div>
  )
}