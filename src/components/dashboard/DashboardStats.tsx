import React from 'react'
import { TrendingUp, Users, DollarSign, Calendar } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: React.ReactNode
}

function StatsCard({ title, value, change, changeType = 'neutral', icon }: StatsCardProps) {
  const changeColor = {
    positive: 'text-green-600 dark:text-green-400',
    negative: 'text-red-600 dark:text-red-400',
    neutral: 'text-gray-600 dark:text-gray-400'
  }[changeType]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {value}
          </p>
          {change && (
            <p className={`text-sm mt-1 ${changeColor}`}>
              {change}
            </p>
          )}
        </div>
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  )
}

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Active ROSCAs"
        value="3"
        change="+1 this month"
        changeType="positive"
        icon={<Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
      />
      <StatsCard
        title="Total Contributed"
        value="$12,500"
        change="+$2,500 this month"
        changeType="positive"
        icon={<DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
      />
      <StatsCard
        title="Next Payment"
        value="$500"
        change="Due in 5 days"
        changeType="neutral"
        icon={<Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
      />
      <StatsCard
        title="Savings Progress"
        value="68%"
        change="+12% this month"
        changeType="positive"
        icon={<TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
      />
    </div>
  )
}