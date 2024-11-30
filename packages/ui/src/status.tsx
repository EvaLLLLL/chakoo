const getStatusColor = (status: 'offline' | 'online' | 'connecting') => {
  switch (status) {
    case 'online':
      return 'bg-green-500'
    case 'offline':
    default:
      return 'bg-gray-500'
  }
}

interface StatusProps {
  status: 'offline' | 'online' | 'connecting'
}

export const Status: React.FC<StatusProps> = ({ status }) => {
  if (status === 'connecting') {
    return (
      <div className="w-2.5 h-2.5">
        <div className="w-full h-full rounded-full border-2 border-yellow-500 border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(status)}`} />
  )
}
