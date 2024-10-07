import { NextRequest, NextResponse } from 'next/server'
import { SensorData } from '@/types/SensorData'

const dataStore: SensorData[] = []

export async function POST(request: NextRequest) {
  try {
    const data: SensorData = await request.json()
    if (!data.sensorId || !data.timestamp || !data.temperature || !data.humidity || !data.soilMoisture) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 })
    }
    dataStore.push(data)
    
    // Update the status API with the client IP
    const clientIP = request.headers.get('x-forwarded-for') || request.ip || 'Unknown'
    await fetch(`${request.nextUrl.origin}/api/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientIP }),
    })

    console.log('Received data from:', clientIP)
    return NextResponse.json({ message: 'Data received successfully' })
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ data: dataStore })
}