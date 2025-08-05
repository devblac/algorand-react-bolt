import React from 'react'
import { ArrowUpRight, ArrowDownLeft, Users, Calendar } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface ActivityItem {
  id: string
  type: 'payment_sent' | 'payment_received' | 'rosca_joined' | 'payout_received'
  title: string
  description: string
  amount?: number
  timestamp: Date
  status: 'completed' | 'pending' | 'failed'
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'payment_sent',
    title: 'Monthly Contribution',
    description: 'Downtown Housing ROSCA',
    amount: 500,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: 'completed'
  },
  {
    id: '2',
    type: 'payout_received',
    title: 'ROSCA Payout',
    description: 'Suburban Dreams ROSCA - Round 3',
    amount: 5000,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: 'completed'
  },
  {
    id: '3',
    type: 'rosca_joined',
    title: 'Joined New ROSCA',
    description: 'City Center Housing Fund',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    status: 'completed'
  }
]

export function RecentActivity() {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'payment_sent':
        return <ArrowUpRight className="w-5 h-5 text-red-500" />
      case 'payment_received':
      case 'payout_received':
        return <ArrowDownLeft className="w-5 h-5 text-green-500" />
      case 'rosca_joined':
        return <Users className="w-5 h-5 text-blue-500" />
      default:
        return <Calendar className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: ActivityItem['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 dark:text-green-400'
      case 'pending':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'failed':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex-shrink-0 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {activity.title}
                  </p>
                  {activity.amount && (
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      ${activity.amount.toLocaleString()}
                    </p>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                  {activity.description}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                  </p>
                  <span className={`text-xs font-medium ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
            View all activity
          </button>
        </div>
      </div>
    </div>
  )
}