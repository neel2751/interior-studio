export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom section-padding">
        <div className="text-center space-y-4 mb-12">
          <div className="h-12 bg-gray-200 rounded-lg w-1/3 mx-auto animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-lg w-2/3 mx-auto animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>

            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-3 animate-pulse"></div>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
                    <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>

              <div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              </div>

              <div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
                <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
              </div>

              <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
