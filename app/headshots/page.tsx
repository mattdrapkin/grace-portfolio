import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function HeadshotsPage() {
  const session = await getServerSession(authOptions);
  const headshots = await prisma.headshot.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Headshots</h1>
        {session && (
          <Link
            href="/admin/headshots-resume"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Manage Headshots & Resume
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {headshots.map((headshot) => (
          <div key={headshot.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={headshot.imageUrl}
              alt={headshot.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{headshot.title}</h2>
              {headshot.description && (
                <p className="text-gray-600">{headshot.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
