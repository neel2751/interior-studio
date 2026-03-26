import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import Button from '@/components/common/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-8 px-4">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
            Page Not Found
          </h2>
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          <p className="text-gray-600">
            The page you&#39;re looking for doesn&#39;t exist or has been moved. 
            Let&#39;s get you back to exploring beautiful interior designs.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/">
            <Home size={18} className="mr-2" />
            Back to Home
          </Button>
          <Button variant="secondary" href="/projects">
            <ArrowLeft size={18} className="mr-2" />
            View Projects
          </Button>
        </div>

        <div className="text-sm text-gray-500">
          Or contact us at{' '}
          <a href="mailto:info@interiorstudioltd.com" className="text-gray-700 hover:text-gray-900">
            info@interiorstudioltd.com
          </a>
        </div>
      </div>
    </div>
  )
}
