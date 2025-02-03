import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const resumes = await prisma.resume.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    });
    return NextResponse.json(resumes);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching resumes' }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { fileUrl } = body;

    // First, set all existing resumes to inactive
    await prisma.resume.updateMany({
      data: {
        isActive: false,
      },
    });

    // Create new resume as active
    const resume = await prisma.resume.create({
      data: {
        fileUrl,
        isActive: true,
      },
    });

    return NextResponse.json(resume);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating resume' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Check if the resume is active
    const resume = await prisma.resume.findUnique({
      where: { id },
    });

    if (resume?.isActive) {
      return NextResponse.json(
        { error: 'Cannot delete the active resume' },
        { status: 400 }
      );
    }

    await prisma.resume.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error deleting resume' }, { status: 500 });
  }
}
