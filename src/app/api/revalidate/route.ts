import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

const WEBHOOK_SECRET = process.env.REVALIDATE_WEBHOOK_SECRET || 'default-secret-key'

export async function POST(request: NextRequest) {
  try {

    const authHeader = request.headers.get('authorization')
    const providedSecret = authHeader?.replace('Bearer ', '')
    
    if (providedSecret !== WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { paths, tags } = body
    if (paths && Array.isArray(paths)) {
      paths.forEach((path: string) => {
        revalidatePath(path)
        console.log(`Revalidated path: ${path}`)
      })
    }

    if (tags && Array.isArray(tags)) {
      tags.forEach((tag: string) => {
        revalidateTag(tag, tag)
        console.log(`Revalidated tag: ${tag}`)
      })
    }

    if (!paths && !tags) {
      const defaultPaths = [
        '/',
        '/services',
        '/projects',
        '/process',
        '/contact'
      ]

      defaultPaths.forEach(path => {
        revalidatePath(path)
        console.log(`Revalidated default path: ${path}`)
      })
              
      revalidateTag('services', 'all')
      revalidateTag('projects', 'all')
      console.log('Revalidated services and projects tags')
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Revalidation completed successfully',
        revalidated: {
          paths: paths || ['/', '/services', '/projects', '/process', '/contact'],
          tags: tags || ['services', 'projects']
        }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Revalidation error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to revalidate cache'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'Revalidation API endpoint',
      usage: 'POST with Bearer token in Authorization header',
      body: {
        paths: ['string array - optional'],
        tags: ['string array - optional']
      }
    },
    { status: 200 }
  )
}
