import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function HeadshotsResume() {
  const session = await getServerSession(authOptions);
  const headshots = await prisma.headshot.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  const activeResume = await prisma.resume.findFirst({
    where: {
      isActive: true,
    },
  });

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-5xl font-light">HEADSHOTS & RESUME</h1>
          {session && (
            <Link
              href="/admin/headshots-resume"
              className="px-4 py-2 text-[#ff4d4d] border border-[#ff4d4d] rounded-md hover:bg-[#ff4d4d] hover:text-white transition-colors"
            >
              Manage Content
            </Link>
          )}
        </div>
        <div className="h-[1px] w-24 bg-[#ff4d4d] mb-12"></div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Headshots Section */}
          <div>
            <h2 className="text-2xl font-light mb-6">HEADSHOTS</h2>
            <div className="grid grid-cols-2 gap-4">
              {headshots.map((headshot) => (
                <div key={headshot.id} className="relative aspect-[3/4] bg-white shadow-sm overflow-hidden">
                  <img
                    src={headshot.imageUrl}
                    alt={headshot.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
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
            {activeResume ? (
              <div className="bg-white shadow-sm">
                <iframe
                  src={`${activeResume.fileUrl}#toolbar=0`}
                  className="w-full aspect-[8.5/11]"
                  title="Resume"
                />
              </div>
            ) : (
              <div className="bg-white p-6 shadow-sm">
                <p className="text-gray-600">Resume will be available soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
