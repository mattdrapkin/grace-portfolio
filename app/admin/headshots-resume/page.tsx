'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { uploadFileToS3, deleteFileFromS3, generateS3Key } from '../../../lib/s3';

interface Headshot {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
}

interface Resume {
  id: string;
  fileUrl: string;
  isActive: boolean;
}

export default function HeadshotsResumePage() {
  const { status } = useSession();
  const router = useRouter();
  const [headshots, setHeadshots] = useState<Headshot[]>([]);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(false);

  // Form states
  const [headshotTitle, setHeadshotTitle] = useState('');
  const [headshotDescription, setHeadshotDescription] = useState('');
  const [selectedHeadshotFile, setSelectedHeadshotFile] = useState<File | null>(null);
  const [selectedResumeFile, setSelectedResumeFile] = useState<File | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else {
      fetchHeadshots();
      fetchResumes();
    }
  }, [status, router]);

  const fetchHeadshots = async () => {
    try {
      const response = await fetch('/api/headshots');
      const data = await response.json();
      setHeadshots(data);
    } catch (error) {
      console.error('Error fetching headshots:', error);
    }
  };

  const fetchResumes = async () => {
    try {
      const response = await fetch('/api/resumes');
      const data = await response.json();
      setResumes(data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    }
  };

  const handleHeadshotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHeadshotFile) return;

    setLoading(true);
    try {
      const key = generateS3Key('headshots', selectedHeadshotFile.name);
      const imageUrl = await uploadFileToS3(key, selectedHeadshotFile);

      const response = await fetch('/api/headshots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: headshotTitle,
          imageUrl,
          description: headshotDescription,
        }),
      });

      if (!response.ok) throw new Error('Failed to create headshot');

      setHeadshotTitle('');
      setHeadshotDescription('');
      setSelectedHeadshotFile(null);
      fetchHeadshots();
    } catch (error) {
      console.error('Error uploading headshot:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResumeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedResumeFile) return;

    setLoading(true);
    try {
      const key = generateS3Key('resumes', selectedResumeFile.name);
      const fileUrl = await uploadFileToS3(key, selectedResumeFile);

      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileUrl }),
      });

      if (!response.ok) throw new Error('Failed to upload resume');

      setSelectedResumeFile(null);
      fetchResumes();
    } catch (error) {
      console.error('Error uploading resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHeadshot = async (headshot: Headshot) => {
    try {
      // Extract key from the URL: https://bucket.s3.region.amazonaws.com/key
      const key = headshot.imageUrl.split('.com/')[1];
      await deleteFileFromS3(key);
      await fetch(`/api/headshots?id=${headshot.id}`, { method: 'DELETE' });
      fetchHeadshots();
    } catch (error) {
      console.error('Error deleting headshot:', error);
    }
  };

  const handleDeleteResume = async (resume: Resume) => {
    try {
      // Extract key from the URL: https://bucket.s3.region.amazonaws.com/key
      const key = resume.fileUrl.split('.com/')[1];
      await deleteFileFromS3(key);
      await fetch(`/api/resumes?id=${resume.id}`, { method: 'DELETE' });
      fetchResumes();
    } catch (error) {
      console.error('Error deleting resume:', error);
    }
  };

  if (status === 'loading') {
    return <div className="min-h-screen pt-20 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-5xl font-light mb-12">Manage Headshots & Resume</h1>

        {/* Headshots Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-light mb-6">Headshots</h2>
          <form onSubmit={handleHeadshotSubmit} className="mb-8">
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Title</label>
                <input
                  type="text"
                  value={headshotTitle}
                  onChange={(e) => setHeadshotTitle(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Description (optional)</label>
                <textarea
                  value={headshotDescription}
                  onChange={(e) => setHeadshotDescription(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>
              <div>
                <label className="block mb-2">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedHeadshotFile(e.target.files?.[0] || null)}
                  className="w-full"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-[#ff4d4d] text-white rounded disabled:opacity-50"
              >
                {loading ? 'Uploading...' : 'Upload Headshot'}
              </button>
            </div>
          </form>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {headshots.map((headshot) => (
              <div key={headshot.id} className="relative group">
                <img
                  src={headshot.imageUrl}
                  alt={headshot.title}
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
                    <h3 className="font-light">{headshot.title}</h3>
                    {headshot.description && (
                      <p className="text-sm opacity-80">{headshot.description}</p>
                    )}
                    <button
                      onClick={() => handleDeleteHeadshot(headshot)}
                      className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Resume Section */}
        <section>
          <h2 className="text-3xl font-light mb-6">Resume</h2>
          <form onSubmit={handleResumeSubmit} className="mb-8">
            <div className="space-y-4">
              <div>
                <label className="block mb-2">PDF Resume</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setSelectedResumeFile(e.target.files?.[0] || null)}
                  className="w-full"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-[#ff4d4d] text-white rounded disabled:opacity-50"
              >
                {loading ? 'Uploading...' : 'Upload Resume'}
              </button>
            </div>
          </form>

          <div className="space-y-4">
            {resumes.map((resume) => (
              <div key={resume.id} className="flex items-center justify-between p-4 bg-white shadow-sm">
                <div>
                  <a
                    href={resume.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ff4d4d] hover:underline"
                  >
                    View Resume
                  </a>
                  {resume.isActive && <span className="ml-2 text-green-600">(Active)</span>}
                </div>
                <button
                  onClick={() => handleDeleteResume(resume)}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
