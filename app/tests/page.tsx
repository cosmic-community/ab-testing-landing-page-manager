import { getABTests } from '@/lib/cosmic'
import TestCard from '@/components/TestCard'
import EmptyState from '@/components/EmptyState'

export default async function TestsPage() {
  const tests = await getABTests()

  const groupedTests = {
    running: tests.filter(test => test.metadata.test_status.key === 'running'),
    paused: tests.filter(test => test.metadata.test_status.key === 'paused'),
    completed: tests.filter(test => test.metadata.test_status.key === 'completed'),
    draft: tests.filter(test => test.metadata.test_status.key === 'draft'),
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">A/B Tests</h1>
          <p className="text-gray-600 mt-2">
            Manage all your A/B tests and track their performance
          </p>
        </div>
      </div>

      {tests.length === 0 ? (
        <EmptyState
          title="No A/B Tests Found"
          description="Create your first A/B test to start optimizing your landing pages."
          action="Create Test"
          href="/"
        />
      ) : (
        <div className="space-y-8">
          {/* Running Tests */}
          {groupedTests.running.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Running Tests ({groupedTests.running.length})
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {groupedTests.running.map((test) => (
                  <TestCard key={test.id} test={test} />
                ))}
              </div>
            </section>
          )}

          {/* Paused Tests */}
          {groupedTests.paused.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Paused Tests ({groupedTests.paused.length})
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {groupedTests.paused.map((test) => (
                  <TestCard key={test.id} test={test} />
                ))}
              </div>
            </section>
          )}

          {/* Completed Tests */}
          {groupedTests.completed.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Completed Tests ({groupedTests.completed.length})
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {groupedTests.completed.map((test) => (
                  <TestCard key={test.id} test={test} />
                ))}
              </div>
            </section>
          )}

          {/* Draft Tests */}
          {groupedTests.draft.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Draft Tests ({groupedTests.draft.length})
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {groupedTests.draft.map((test) => (
                  <TestCard key={test.id} test={test} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}