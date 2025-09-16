import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🧪</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">A/B Tester</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link 
              href="/tests" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              A/B Tests
            </Link>
            <Link 
              href="/pages" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Landing Pages
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-primary-600 focus:outline-none focus:text-primary-600"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}