import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  useEffect(() => { navigate('/map', { replace: true }) }, [navigate])
  return null
}
