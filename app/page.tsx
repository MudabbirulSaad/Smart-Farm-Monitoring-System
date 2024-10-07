import SensorDataChart from './components/SensorDataChart'
import LatestReadings from './components/LatestReadings'
import ApiStatus from './components/ApiStatus'

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Farm Environmental Data</h1>
        <ApiStatus />
      </div>
      <LatestReadings />
      <SensorDataChart />
    </div>
  )
}