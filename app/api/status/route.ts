import { NextRequest, NextResponse } from 'next/server'

let lastClientIP: string | null = null

export async function GET() {
  // Return the last known client IP
  return NextResponse.json({ status: 'connected', ipAddress: lastClientIP || 'Unknown' })
}

export async function POST(request: NextRequest) {
  // Update the last known client IP
  lastClientIP = request.headers.get('x-forwarded-for') || request.ip || 'Unknown'
  return NextResponse.json({ message: 'Status updated' })
}