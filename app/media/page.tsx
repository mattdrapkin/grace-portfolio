'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

interface MediaItem {
  id: string;
  title: string;
  youtubeUrl: string;
  description: string | null;
}

export default function MediaPage() {
  const { data: session } = useSession();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    fetch('/api/media')
      .then((res) => res.json())
      .then((data) => setMediaItems(data));
  }, []);

  const getYoutubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="min-h-screen pt-32 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-light">Media</h1>
          {session && (
            <button
              onClick={() => window.location.href = '/admin/media'}
              className="px-4 py-2 bg-[#ff4d4d] text-white rounded-md hover:bg-[#ff3333] transition-colors"
            >
              Manage Media
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mediaItems.map((item) => (
            <div key={item.id} className="space-y-4">
              <div className="aspect-video">
                <iframe
                  src={getYoutubeEmbedUrl(item.youtubeUrl)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <h3 className="text-xl font-light">{item.title}</h3>
              {item.description && (
                <p className="text-gray-600">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
