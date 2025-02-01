export default function About() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-light">ABOUT</h1>
            <div className="h-[1px] w-24 bg-[#ff4d4d]"></div>
            <div className="space-y-4 text-gray-700">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Currently pursuing MFA at Rider University
                <br />
                Based in Bucks County, PA
              </p>
            </div>
          </div>
          
          <div className="relative h-[500px] bg-[#f0f0f0]">
            {/* Placeholder for about image */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              About Image Placeholder
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
