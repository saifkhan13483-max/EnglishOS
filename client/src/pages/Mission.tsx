import { useSearchParams } from 'react-router-dom'
import MissionShell from '@/components/mission/MissionShell'

export default function Mission() {
  const [params] = useSearchParams()
  const type = params.get('type') === 'evening' ? 'evening' : 'morning'
  return <MissionShell type={type} />
}
