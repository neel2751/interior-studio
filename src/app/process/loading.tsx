export default function ProcessLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom section-padding">
        <div className="text-center space-y-4 mb-12">
          <div className="h-12 bg-gray-200 rounded-lg w-1/3 mx-auto animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-lg w-2/3 mx-auto animate-pulse"></div>
        </div>

        <div className="space-y-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="relative">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
                <div className="flex-grow space-y-4">
                  <div className="h-7 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-5 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
              {i < 6 && (
                <div className="hidden lg:block absolute top-12 left-6 w-0.5 h-24 bg-gray-300"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
