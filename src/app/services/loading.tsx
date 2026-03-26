export default function ServicesLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom section-padding">
        <div className="text-center space-y-4 mb-12">
          <div className="h-12 bg-gray-200 rounded-lg w-1/3 mx-auto animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-lg w-2/3 mx-auto animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="aspect-[16/10] bg-gray-200 animate-pulse"></div>
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded-lg w-1/2 animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
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
