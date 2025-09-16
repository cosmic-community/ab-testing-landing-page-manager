import { getLandingPages } from '@/lib/cosmic'
import VariantCard from '@/components/VariantCard'
import EmptyState from '@/components/EmptyState'

export default async function PagesPage() {
  const pages = await getLandingPages()

  const groupedPages = {
    live: pages.filter(page => page.metadata.page_status.key === 'live'),
    draft: pages.filter(page => page.metadata.page_status.key === 'draft'),
    archived: pages.filter(page => page.metadata.page_status.key === 'archived'),
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Landing Pages</h1>
          <p className="text-gray-600 mt-2">
            Manage all your landing page variants and their content
          </p>
        </div>
      </div>

      {pages.length === 0 ? (
        <EmptyState
          title="No Landing Pages Found"
          description="Create your first landing page variant to start testing."
          action="Create Page"
          href="/"
        />
      ) : (
        <div className="space-y-8">
          {/* Live Pages */}
          {groupedPages.live.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Live Pages ({groupedPages.live.length})
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {groupedPages.live.map((page) => (
                  <VariantCard key={page.id} variant={page} />
                ))}
              </div>
            </section>
          )}

          {/* Draft Pages */}
          {groupedPages.draft.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Draft Pages ({groupedPages.draft.length})
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {groupedPages.draft.map((page) => (
                  <VariantCard key={page.id} variant={page} />
                ))}
              </div>
            </section>
          )}

          {/* Archived Pages */}
          {groupedPages.archived.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Archived Pages ({groupedPages.archived.length})
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {groupedPages.archived.map((page) => (
                  <VariantCard key={page.id} variant={page} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}