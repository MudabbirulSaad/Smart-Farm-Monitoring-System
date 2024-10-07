'use client'

import { useState, useEffect } from 'react'
import { SensorData } from '@/types/SensorData'

export default function LatestReadings() {
  const [latestData, setLatestData] = useState<SensorData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const response = await fetch('/api/sensor-data')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const result = await response.json()
        if (Array.isArray(result.data) && result.data.length > 0) {
          setLatestData(result.data[result.data.length - 1])
          setError(null)
        } else {
          setLatestData(null)
          setError('No data available')
        }
      } catch (error) {
        console.error('Error fetching latest data:', error)
        setLatestData(null)
        setError('Error fetching data')
      }
    }

    fetchLatestData()
    const intervalId = setInterval(fetchLatestData, 5000)
    return () => clearInterval(intervalId)
  }, [])

  if (error) {
    return <div className="text-center text-red-600">{error}</div>
  }

  if (!latestData) {
    return <div className="text-center text-gray-600">Loading latest readings...</div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Latest Readings</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-100 p-4 rounded-lg">
          <p className="text-lg font-medium text-red-800">Temperature</p>
          <p className="text-3xl font-bold text-red-600">{latestData.temperature.toFixed(1)}°C</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <p className="text-lg font-medium text-blue-800">Humidity</p>
          <p className="text-3xl font-bold text-blue-600">{latestData.humidity.toFixed(1)}%</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <p className="text-lg font-medium text-green-800">Soil Moisture</p>
          <p className="text-3xl font-bold text-green-600">{latestData.soilMoisture.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  )
}