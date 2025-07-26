import { NextRequest, NextResponse } from 'next/server'
import { prisma } from 'lib/db'

interface CreateTicketRequest {
  title: string
  description: string
  summary?: string
  categoryId: string
  userId: string
}

// GET /api/tickets - Get all tickets with category and user info
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { summary: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (category && category !== 'All') {
      where.category = {
        name: category
      }
    }

    // Get tickets with relations
    const tickets = await prisma.ticket.findMany({
      where,
      include: {
        category: true,
        user: {
          select: {
            username: true
          }
        }
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Get total count for pagination
    const total = await prisma.ticket.count({ where })

    return NextResponse.json({
      tickets,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching tickets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tickets' },
      { status: 500 }
    )
  }
}

// POST /api/tickets - Create a new ticket
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as CreateTicketRequest
    const { title, description, summary, categoryId, userId } = body

    // Validate required fields
    if (!title || !description || !categoryId || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const ticket = await prisma.ticket.create({
      data: {
        title,
        description,
        summary,
        categoryId,
        userId
      },
      include: {
        category: true,
        user: {
          select: {
            username: true
          }
        }
      }
    })

    return NextResponse.json(ticket, { status: 201 })
  } catch (error) {
    console.error('Error creating ticket:', error)
    return NextResponse.json(
      { error: 'Failed to create ticket' },
      { status: 500 }
    )
  }
} 