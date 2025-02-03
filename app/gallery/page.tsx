export default function Gallery() {
  const galleryItems = [
    {
      id: 1,
      title: "Performance 1",
      description: "Role • 2023",
      imageUrl: "/images/gallery/placeholder1.jpg"
    },
    {
      id: 2,
      title: "Performance 2",
      description: "Role • 2023",
      imageUrl: "/images/gallery/placeholder2.jpg"
    },
    {
      id: 3,
      title: "Performance 3",
      description: "Role • 2022",
      imageUrl: "/images/gallery/placeholder3.jpg"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-5xl font-light">GALLERY</h1>
        </div>
        <div className="h-[1px] w-24 bg-[#ff4d4d] mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div key={item.id} className="group relative aspect-square bg-white shadow-sm overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                {item.title}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-lg font-light">{item.title}</h3>
                  {item.description && (
                    <p className="text-white/80 text-sm">{item.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
