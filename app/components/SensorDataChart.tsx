'use client'

import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { SensorData } from '@/types/SensorData'
import { format } from 'date-fns'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function SensorDataChart() {
  const [data, setData] = useState<SensorData[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/sensor-data')
        if (response.ok) {
          const result = await response.json()
          if (Array.isArray(result.data)) {
            setData(result.data)
            setIsConnected(true)
            setError(null)
          } else {
            throw new Error('Received data is not an array')
          }
        } else {
          throw new Error('Failed to fetch data')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setIsConnected(false)
        setData([])
        setError(error instanceof Error ? error.message : 'An unknown error occurred')
      }
    }

    fetchData()
    const intervalId = setInterval(fetchData, 5000)
    return () => clearInterval(intervalId)
  }, [])

  const chartData = {
    labels: data.map(d => format(new Date(d.timestamp), 'HH:mm:ss')),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.map(d => d.temperature),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Humidity (%)',
        data: data.map(d => d.humidity),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
      },
      {
        label: 'Soil Moisture (%)',
        data: data.map(d => d.soilMoisture),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        yAxisID: 'y1',
      },
    ],
  }

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Farm Sensor Data',
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Humidity / Soil Moisture (%)',
        },
      },
    },
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sensor Data Over Time</h2>
      {isConnected && data.length > 0 ? (
        <div className="h-[400px]">
          <Line data={chartData} options={options} />
        </div>
      ) : (
        <div className="h-[400px] flex items-center justify-center text-gray-500">
          {error ? `Error: ${error}` : 'No data available. Please check your connection.'}
        </div>
      )}
    </div>
  )
}