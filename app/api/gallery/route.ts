import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const gallery = await prisma.gallery.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(gallery);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching gallery' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, imageUrl, description } = body;

    const gallery = await prisma.gallery.create({
      data: {
        title,
        imageUrl,
        description,
      },
    });

    return NextResponse.json(gallery);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating gallery item' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, title, imageUrl, description } = body;

    const gallery = await prisma.gallery.update({
      where: { id },
      data: {
        title,
        imageUrl,
        description,
      },
    });

    return NextResponse.json(gallery);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating gallery item' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
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

    await prisma.gallery.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error deleting gallery item' }, { status: 500 });
  }
}
