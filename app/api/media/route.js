import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
const prisma = new PrismaClient();

export async function GET() {
  try {
    const media = await prisma.media.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(media);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching media' }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, youtubeUrl, description } = body;

    const media = await prisma.media.create({
      data: {
        title,
        youtubeUrl,
        description,
      },
    });

    return NextResponse.json(media);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating media' }, { status: 500 });
  }
}

export async function PUT(request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, title, youtubeUrl, description } = body;

    const media = await prisma.media.update({
      where: { id },
      data: {
        title,
        youtubeUrl,
        description,
      },
    });

    return NextResponse.json(media);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating media' }, { status: 500 });
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

    await prisma.media.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error deleting media' }, { status: 500 });
  }
}
