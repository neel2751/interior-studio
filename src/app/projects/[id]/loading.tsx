export default function ProjectLoading() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom section-padding">
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="aspect-[4/3] bg-gray-200 rounded-lg animate-pulse lg:col-span-2 lg:row-span-2"></div>
              <div className="aspect-[4/3] bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="aspect-[4/3] bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="aspect-[4/3] bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="h-10 bg-gray-200 rounded-lg w-3/4 mb-4 animate-pulse"></div>
                <div className="flex flex-wrap gap-4 text-sm mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                </div>
              </div>

              <div>
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
                <div className="space-y-3">
                  <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>

              <div>
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gray-200 rounded-full mt-2 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded flex-grow animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-8 bg-gray-200 rounded-full w-24 animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i}>
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-1 animate-pulse"></div>
                      <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center space-y-4">
                <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded-lg w-full animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded-lg w-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
