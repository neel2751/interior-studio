export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">IS</span>
          </div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
        <p className="text-gray-600 text-sm">Loading beautiful designs...</p>
      </div>
    </div>
  )
}
