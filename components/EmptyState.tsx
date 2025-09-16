import Link from 'next/link'

interface EmptyStateProps {
  title: string
  description: string
  action: string
  href: string
}

export default function EmptyState({ title, description, action, href }: EmptyStateProps) {
  return (
    <div className="card p-12 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">{description}</p>
      
      <Link href={href} className="btn-primary">
        {action}
      </Link>
    </div>
  )
}