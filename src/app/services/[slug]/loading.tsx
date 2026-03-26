export default function ServiceLoading() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded-lg w-2/3 animate-pulse"></div>
            </div>
            <div className="space-y-3">
              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-4/5 animate-pulse"></div>
            </div>
            <div className="flex space-x-4">
              <div className="h-12 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
            </div>
          </div>
          <div className="aspect-[4/3] bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-3 animate-pulse"></div>
              <div className="h-5 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <div>
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex space-x-4">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0 animate-pulse"></div>
                  <div className="flex-grow">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
