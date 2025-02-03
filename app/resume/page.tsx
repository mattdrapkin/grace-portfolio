import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function ResumePage() {
  const session = await getServerSession(authOptions);
  const activeResume = await prisma.resume.findFirst({
    where: {
      isActive: true,
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Resume</h1>
        {session && (
          <Link
            href="/admin/headshots-resume"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Manage Headshots & Resume
          </Link>
        )}
      </div>
      
      {activeResume ? (
        <div className="w-full aspect-[8.5/11] bg-white rounded-lg shadow-lg overflow-hidden">
          <iframe
            src={`${activeResume.fileUrl}#toolbar=0`}
            className="w-full h-full"
            title="Resume"
          />
        </div>
      ) : (
        <p className="text-gray-600">No resume available.</p>
      )}
    </div>
  );
}
