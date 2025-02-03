import Link from 'next/link';

export default function Headshots() {
  const headshots = [
    {
      id: 1,
      title: "Headshot 1",
      description: "2023",
      imageUrl: "/images/headshots/placeholder1.jpg"
    },
    {
      id: 2,
      title: "Headshot 2",
      description: "2023",
      imageUrl: "/images/headshots/placeholder2.jpg"
    },
    {
      id: 3,
      title: "Headshot 3",
      description: "2022",
      imageUrl: "/images/headshots/placeholder3.jpg"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-5xl font-light mb-6">HEADSHOTS</h1>
        <div className="h-[1px] w-24 bg-[#ff4d4d] mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {headshots.map((headshot) => (
            <div key={headshot.id} className="group relative aspect-square bg-white shadow-sm overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                {headshot.title}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-lg font-light">{headshot.title}</h3>
                  {headshot.description && (
                    <p className="text-white/80 text-sm">{headshot.description}</p>
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
