import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const resumes = await prisma.resume.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const data = await request.json();
    const { fileUrl } = data;

    // Create new resume
    const resume = await prisma.resume.create({
      data: {
        fileUrl,
        isActive: false,
      },
    });

    return NextResponse.json(resume);
  } catch (error) {
    console.error('Error creating resume:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return new NextResponse('Missing id parameter', { status: 400 });
    }

    // Delete resume
    await prisma.resume.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting resume:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
