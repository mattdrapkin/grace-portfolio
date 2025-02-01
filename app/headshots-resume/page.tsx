export default function HeadshotsResume() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-5xl font-light mb-6">HEADSHOTS & RESUME</h1>
        <div className="h-[1px] w-24 bg-[#ff4d4d] mb-12"></div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Headshots Section */}
          <div>
            <h2 className="text-2xl font-light mb-6">HEADSHOTS</h2>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative aspect-[3/4] bg-[#f0f0f0]">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    Headshot {i}
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
