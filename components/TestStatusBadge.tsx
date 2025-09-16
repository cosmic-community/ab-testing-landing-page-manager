import type { TestStatus } from '@/types'

interface TestStatusBadgeProps {
  status: TestStatus
}

export default function TestStatusBadge({ status }: TestStatusBadgeProps) {
  const statusConfig = {
    running: {
      className: 'status-running',
      label: 'Running'
    },
    paused: {
      className: 'status-paused', 
      label: 'Paused'
    },
    completed: {
      className: 'status-completed',
      label: 'Completed'
    },
    draft: {
      className: 'status-draft',
      label: 'Draft'
    }
  }

  const config = statusConfig[status]

  return (
    <span className={config.className}>
      {config.label}
    </span>
  )
}