import { useParams, Navigate } from 'react-router-dom'
import MissionShell from '@/components/mission/MissionShell'

export default function Mission() {
  const { type } = useParams<{ type: string }>()

  if (type !== 'morning' && type !== 'evening') {
    return <Navigate to="/map" replace />
  }

  return <MissionShell type={type} />
}
