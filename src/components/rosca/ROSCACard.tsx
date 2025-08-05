import React from 'react'
import { Users, Calendar, DollarSign, TrendingUp } from 'lucide-react'
import { ROSCA } from '../../types'
import { formatDistanceToNow } from 'date-fns'

interface ROSCACardProps {
  rosca: ROSCA
  participation?: {
    position: number
    total_contributed: number
    status: string
  }
  onClick?: () => void
}

export function ROSCACard({ rosca, participation, onClick }: ROSCACardProps) {
  const progressPercentage = (rosca.current_participants / rosca.max_participants) * 100
  const isUserParticipant = !!participation

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'forming':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {rosca.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {rosca.description}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(rosca.status)}`}>
          {rosca.status}
        </span>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Pool</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              ${rosca.total_amount.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Contribution</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              ${rosca.contribution_amount}/{rosca.frequency}
            </p>
          </div>
        </div>
      </div>

      {/* Participation Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {rosca.current_participants}/{rosca.max_participants} participants
            </span>
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* User Participation Info */}
      {isUserParticipant && participation && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                Your Position: #{participation.position}
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                Contributed: ${participation.total_contributed.toLocaleString()}
              </p>
            </div>
            <div className="p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
              <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="text-xs text-gray-500 dark:text-gray-400">
        {rosca.status === 'forming' ? (
          <span>Starting {formatDistanceToNow(new Date(rosca.start_date), { addSuffix: true })}</span>
        ) : (
          <span>Started {formatDistanceToNow(new Date(rosca.start_date), { addSuffix: true })}</span>
        )}
      </div>
    </div>
  )
}