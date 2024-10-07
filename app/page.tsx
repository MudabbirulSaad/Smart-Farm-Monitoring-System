import SensorDataChart from './components/SensorDataChart'
import LatestReadings from './components/LatestReadings'

export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Farm Environmental Data</h1>
      <LatestReadings />
      <SensorDataChart />
    </div>
  )
}