import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { writeFile } from 'fs/promises';
import path from 'path';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const fileExt = path.extname(file.name);
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}${fileExt}`;
    
    // Ensure the uploads directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await writeFile(path.join(uploadDir, fileName), buffer);

    // Return the URL for the uploaded file
    return NextResponse.json({ url: `/uploads/${fileName}` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
  }
}
