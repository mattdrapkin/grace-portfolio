'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface MediaItem {
  id: string;
  title: string;
  youtubeUrl: string;
  description: string | null;
}

export default function AdminMediaPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    youtubeUrl: '',
    description: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    fetch('/api/media')
      .then((res) => res.json())
      .then((data) => setMediaItems(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/media', {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(isEditing ? { ...formData, id: isEditing } : formData),
      });

      if (response.ok) {
        const updatedMedia = await fetch('/api/media').then((res) => res.json());
        setMediaItems(updatedMedia);
        setFormData({ title: '', youtubeUrl: '', description: '' });
        setIsEditing(null);
      }
    } catch (error) {
      console.error('Error saving media:', error);
    }
  };

  const handleEdit = (item: MediaItem) => {
    setIsEditing(item.id);
    setFormData({
      title: item.title,
      youtubeUrl: item.youtubeUrl,
      description: item.description || '',
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`/api/media?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedMedia = await fetch('/api/media').then((res) => res.json());
        setMediaItems(updatedMedia);
      }
    } catch (error) {
      console.error('Error deleting media:', error);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen pt-32 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-light">Manage Media</h1>
          <button
            onClick={() => router.push('/media')}
            className="px-4 py-2 text-[#ff4d4d] border border-[#ff4d4d] rounded-md hover:bg-[#ff4d4d] hover:text-white transition-colors"
          >
            View Media Page
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mb-12 space-y-6 max-w-2xl">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff4d4d] focus:border-[#ff4d4d]"
              required
            />
          </div>

          <div>
            <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-700">
              YouTube URL
            </label>
            <input
              type="url"
              id="youtubeUrl"
              value={formData.youtubeUrl}
              onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff4d4d] focus:border-[#ff4d4d]"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff4d4d] focus:border-[#ff4d4d]"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#ff4d4d] hover:bg-[#ff3333] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff4d4d]"
          >
            {isEditing ? 'Update Media' : 'Add Media'}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(null);
                setFormData({ title: '', youtubeUrl: '', description: '' });
              }}
              className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff4d4d]"
            >
              Cancel
            </button>
          )}
        </form>

        <div className="space-y-6">
          {mediaItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-light">{item.title}</h3>
                  {item.description && (
                    <p className="text-gray-600 mt-2">{item.description}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-2">{item.youtubeUrl}</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
