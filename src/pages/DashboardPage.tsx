import React, { useState } from 'react'
import { Plus, Home, TrendingUp, Users } from 'lucide-react'
import { DashboardStats } from '../components/dashboard/DashboardStats'
import { RecentActivity } from '../components/dashboard/RecentActivity'
import { ROSCACard } from '../components/rosca/ROSCACard'
import { CreateROSCAForm } from '../components/rosca/CreateROSCAForm'
import { useAuth } from '../contexts/AuthContext'
import { useWalletContext } from '../contexts/WalletContext'
import { WalletButton } from '@txnlab/use-wallet-ui-react'

// Mock data for demonstration
const mockROSCAs = [
  {
    id: '1',
    name: 'Downtown Housing Fund',
    description: 'A community-driven ROSCA focused on downtown area properties with excellent growth potential.',
    total_amount: 50000,
    contribution_amount: 5000,
    frequency: 'monthly' as const,
    duration_months: 10,
    max_participants: 10,
    current_participants: 8,
    status: 'active' as const,
    start_date: '2024-01-15',
    end_date: '2024-11-15',
    admin_id: 'user1',
    created_at: '2024-01-01',
    updated_at: '2024-01-15'
  },
  {
    id: '2',
    name: 'Suburban Dreams',
    description: 'Perfect for families looking to invest in suburban properties with great schools and amenities.',
    total_amount: 75000,
    contribution_amount: 7500,
    frequency: 'monthly' as const,
    duration_months: 10,
    max_participants: 10,
    current_participants: 6,
    status: 'forming' as const,
    start_date: '2024-03-01',
    end_date: '2025-01-01',
    admin_id: 'user2',
    created_at: '2024-02-01',
    updated_at: '2024-02-15'
  }
]

export function DashboardPage() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const { userProfile } = useAuth()
  const { walletConnection, accountBalance } = useWalletContext()

  const handleCreateROSCA = async (data: any) => {
    // This would integrate with Supabase to create the ROSCA
    console.log('Creating ROSCA:', data)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {userProfile?.full_name || 'User'}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Here's your housing finance journey overview
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              {!walletConnection ? (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <Home className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        Connect your wallet to start participating
                      </p>
                    </div>
                    <WalletButton />
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-800 dark:text-green-200">
                        Wallet Connected
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-400">
                        Balance: {accountBalance.toFixed(4)} ALGO
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <DashboardStats />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My ROSCAs */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                My ROSCAs
              </h2>
              <button
                onClick={() => setShowCreateForm(true)}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create ROSCA
              </button>
            </div>
            
            <div className="space-y-6">
              {mockROSCAs.map((rosca) => (
                <ROSCACard
                  key={rosca.id}
                  rosca={rosca}
                  participation={{
                    position: 3,
                    total_contributed: 15000,
                    status: 'active'
                  }}
                />
              ))}
            </div>

            {mockROSCAs.length === 0 && (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No ROSCAs yet
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Start your housing finance journey by creating or joining a ROSCA
                </p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First ROSCA
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <RecentActivity />
            
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  to="/browse"
                  className="block w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Browse Available ROSCAs
                    </span>
                  </div>
                </Link>
                <button className="block w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Invite Friends
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create ROSCA Modal */}
      {showCreateForm && (
        <CreateROSCAForm
          onClose={() => setShowCreateForm(false)}
          onSubmit={handleCreateROSCA}
        />
      )}
    </div>
  )
}