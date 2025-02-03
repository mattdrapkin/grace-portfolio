import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const headshots = await prisma.headshot.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(headshots);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching headshots' }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, imageUrl, description } = body;

    const headshot = await prisma.headshot.create({
      data: {
        title,
        imageUrl,
        description,
      },
    });

    return NextResponse.json(headshot);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating headshot' }, { status: 500 });
  }
}

export async function PUT(request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, title, imageUrl, description } = body;

    const headshot = await prisma.headshot.update({
      where: { id },
      data: {
        title,
        imageUrl,
        description,
      },
    });

    return NextResponse.json(headshot);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating headshot' }, { status: 500 });
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

    await prisma.headshot.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error deleting headshot' }, { status: 500 });
  }
}
