import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Gallery() {
  const session = await getServerSession(authOptions);
  const gallery = await prisma.gallery.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-5xl font-light">GALLERY</h1>
          {session && (
            <Link
              href="/admin/gallery"
              className="px-4 py-2 text-[#ff4d4d] border border-[#ff4d4d] rounded-md hover:bg-[#ff4d4d] hover:text-white transition-colors"
            >
              Manage Gallery
            </Link>
          )}
        </div>
        <div className="h-[1px] w-24 bg-[#ff4d4d] mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div key={item.id} className="group relative aspect-square bg-white shadow-sm overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
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
