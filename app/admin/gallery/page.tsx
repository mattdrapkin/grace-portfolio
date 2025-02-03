'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { uploadFileToS3, deleteFileFromS3, generateS3Key } from '../../../lib/s3';
import Image from 'next/image';

interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
}

export default function AdminGalleryPage() {
  const { status } = useSession();
  const router = useRouter();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    description: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else {
      fetchGallery();
    }
  }, [status, router]);

  const fetchGallery = async () => {
    try {
      const response = await fetch('/api/gallery');
      const data = await response.json();
      setGalleryItems(data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile && !isEditing) return;

    setLoading(true);
    try {
      let imageUrl = formData.imageUrl;

      if (selectedFile) {
        const key = generateS3Key('gallery', selectedFile.name);
        imageUrl = await uploadFileToS3(key, selectedFile);
      }

      const response = await fetch('/api/gallery', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isEditing 
          ? { ...formData, id: isEditing, imageUrl } 
          : { ...formData, imageUrl }
        ),
      });

      if (!response.ok) throw new Error('Failed to create gallery item');

      if (isEditing) {
        // Extract key from the URL: https://bucket.s3.region.amazonaws.com/key
        const key = formData.imageUrl.split('.com/')[1];
        await deleteFileFromS3(key);
      }

      setFormData({ title: '', imageUrl: '', description: '' });
      setSelectedFile(null);
      setIsEditing(null);
      fetchGallery();
    } catch (error) {
      console.error('Error uploading gallery item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setIsEditing(item.id);
    setFormData({
      title: item.title,
      imageUrl: item.imageUrl,
      description: item.description || '',
    });
  };

  const handleDelete = async (item: GalleryItem) => {
    try {
      // Extract key from the URL: https://bucket.s3.region.amazonaws.com/key
      const key = item.imageUrl.split('.com/')[1];
      await deleteFileFromS3(key);
      await fetch(`/api/gallery?id=${item.id}`, { method: 'DELETE' });
      fetchGallery();
    } catch (error) {
      console.error('Error deleting gallery item:', error);
    }
  };

  if (status === 'loading') {
    return <div className="min-h-screen pt-20 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-5xl font-light mb-12">Manage Gallery</h1>

        <form onSubmit={handleSubmit} className="mb-12">
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Description (optional)</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>
            <div>
              <label className="block mb-2">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#ff4d4d] text-white rounded disabled:opacity-50"
            >
              {loading ? 'Uploading...' : isEditing ? 'Update Image' : 'Upload Image'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(null);
                  setFormData({ title: '', imageUrl: '', description: '' });
                  setSelectedFile(null);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item) => (
            <div key={item.id} className="relative group">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
                  <h3 className="font-light">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm opacity-80">{item.description}</p>
                  )}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
