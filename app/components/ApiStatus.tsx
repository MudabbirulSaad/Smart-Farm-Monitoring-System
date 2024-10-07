'use client'

import { useState, useEffect } from 'react'

export default function ApiStatus() {
  const [status, setStatus] = useState<'connected' | 'disconnected'>('disconnected')
  const [ipAddress, setIpAddress] = useState<string | null>(null)

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch('/api/status')
        if (response.ok) {
          const data = await response.json()
          setStatus('connected')
          setIpAddress(data.ipAddress)
        } else {
          throw new Error('API not responding')
        }
      } catch {
        setStatus('disconnected')
        setIpAddress(null)
      }
    }

    checkApiStatus()
    const intervalId = setInterval(checkApiStatus, 5000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="text-sm">
      {status === 'connected' ? (
        <span className="text-green-600">
          Connected {ipAddress && `(Last sender IP: ${ipAddress})`}
        </span>
      ) : (
        <span className="text-red-600">Disconnected</span>
      )}
    </div>
  )
}