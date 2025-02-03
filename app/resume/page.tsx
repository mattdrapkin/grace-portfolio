import Link from 'next/link';

export default function Resume() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-5xl font-light mb-6">RESUME</h1>
        <div className="h-[1px] w-24 bg-[#ff4d4d] mb-12"></div>
        
        <div className="bg-white p-8 shadow-sm">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-light mb-4">EDUCATION</h2>
              <div className="space-y-2">
                <p className="font-medium">MFA - Rider University</p>
                <p className="text-gray-600">Expected [Year]</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light mb-4">THEATER</h2>
              <div className="space-y-2">
                <div>
                  <p className="font-medium">Performance Title</p>
                  <p className="text-gray-600">Role • Theater Name • Year</p>
                </div>
                <div>
                  <p className="font-medium">Performance Title</p>
                  <p className="text-gray-600">Role • Theater Name • Year</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light mb-4">SKILLS</h2>
              <div className="space-y-2">
                <p className="text-gray-600">Skill Category 1: Skill 1, Skill 2, Skill 3</p>
                <p className="text-gray-600">Skill Category 2: Skill 1, Skill 2, Skill 3</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
