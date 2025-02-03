import Link from 'next/link';

export default function HeadshotsResume() {
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
    },
    {
      id: 4,
      title: "Headshot 4",
      description: "2022",
      imageUrl: "/images/headshots/placeholder4.jpg"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-5xl font-light">HEADSHOTS & RESUME</h1>
          <Link
            href="/admin/headshots-resume"
            className="px-4 py-2 text-[#ff4d4d] border border-[#ff4d4d] rounded-md hover:bg-[#ff4d4d] hover:text-white transition-colors"
          >
            Manage Content
          </Link>
        </div>
        <div className="h-[1px] w-24 bg-[#ff4d4d] mb-12"></div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Headshots Section */}
          <div>
            <h2 className="text-2xl font-light mb-6">HEADSHOTS</h2>
            <div className="grid grid-cols-2 gap-4">
              {headshots.map((headshot) => (
                <div key={headshot.id} className="relative aspect-[3/4] bg-white shadow-sm overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    {headshot.title}
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <h3 className="text-white font-light">{headshot.title}</h3>
                      {headshot.description && (
                        <p className="text-white/80 text-sm">{headshot.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resume Section */}
          <div>
            <h2 className="text-2xl font-light mb-6">RESUME</h2>
            <div className="bg-white p-6 shadow-sm">
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl mb-3">EDUCATION</h3>
                  <p>MFA - Rider University</p>
                  <p className="text-gray-600">Expected [Year]</p>
                </section>

                <section>
                  <h3 className="text-xl mb-3">THEATER</h3>
                  <p className="text-gray-600">Lorem ipsum dolor sit amet</p>
                  <p className="text-gray-600">Consectetur adipiscing elit</p>
                </section>

                <section>
                  <h3 className="text-xl mb-3">SKILLS</h3>
                  <p className="text-gray-600">Lorem ipsum dolor sit amet</p>
                  <p className="text-gray-600">Consectetur adipiscing elit</p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
