import Link from 'next/link'
import type { ABTest } from '@/types'
import TestStatusBadge from './TestStatusBadge'

interface TestCardProps {
  test: ABTest
}

export default function TestCard({ test }: TestCardProps) {
  return (
    <Link href={`/tests/${test.slug}`} className="block">
      <div className="card p-6 hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600">
            {test.metadata.test_name}
          </h3>
          <TestStatusBadge status={test.metadata.test_status.key} />
        </div>

        {test.metadata.description && (
          <p className="text-gray-600 mb-4 line-clamp-2">
            {test.metadata.description}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Traffic Split:</span>
            <div className="font-medium text-gray-900">
              {test.metadata.traffic_split || 50}% / {100 - (test.metadata.traffic_split || 50)}%
            </div>
          </div>
          
          <div>
            <span className="text-gray-500">Goal:</span>
            <div className="font-medium text-gray-900 truncate">
              {test.metadata.conversion_goal || 'Not specified'}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}