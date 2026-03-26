export default function ProjectsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom section-padding">
        <div className="text-center space-y-4 mb-12">
          <div className="h-12 bg-gray-200 rounded-lg w-1/3 mx-auto animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-lg w-2/3 mx-auto animate-pulse"></div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <div className="h-10 bg-gray-200 rounded-full w-32 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-full w-28 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-full w-32 animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="aspect-[4/3] bg-gray-200 relative animate-pulse">
                <div className="absolute top-4 left-4">
                  <div className="h-6 bg-gray-300 rounded-full w-20 animate-pulse"></div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="h-6 bg-gray-300 rounded-full w-16 animate-pulse"></div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
