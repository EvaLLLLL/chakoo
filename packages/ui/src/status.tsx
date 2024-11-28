const getStatusColor = (status: 'offline' | 'online' | 'connecting') => {
  switch (status) {
    case 'online':
      return 'bg-green-500'
    case 'connecting':
      return 'bg-yellow-500'
    case 'offline':
    default:
      return 'bg-red-500'
  }
}

interface StatusProps {
  status: 'offline' | 'online' | 'connecting'
}

const Status: React.FC<StatusProps> = ({ status }) => {
  return (
    <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(status)}`} />
  )
}

export default Status
