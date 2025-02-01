export default function Gallery() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-5xl font-light mb-6">GALLERY</h1>
        <div className="h-[1px] w-24 bg-[#ff4d4d] mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="group relative aspect-square bg-[#f0f0f0] overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Gallery Image {i}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-light">Performance Title</h3>
                  <p className="text-sm">Role • Year</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
