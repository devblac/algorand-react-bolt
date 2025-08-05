import React, { useState } from 'react'
import { Search, Filter, MapPin, DollarSign, Users, Calendar } from 'lucide-react'
import { ROSCACard } from '../components/rosca/ROSCACard'

// Mock data for available ROSCAs
const mockAvailableROSCAs = [
  {
    id: '3',
    name: 'City Center Housing Fund',
    description: 'Prime location properties in the heart of the city with excellent appreciation potential.',
    total_amount: 100000,
    contribution_amount: 10000,
    frequency: 'monthly' as const,
    duration_months: 10,
    max_participants: 10,
    current_participants: 4,
    status: 'forming' as const,
    start_date: '2024-04-01',
    end_date: '2025-02-01',
    admin_id: 'user3',
    created_at: '2024-03-01',
    updated_at: '2024-03-15'
  },
  {
    id: '4',
    name: 'Coastal Properties Collective',
    description: 'Beachfront and coastal area investments with strong rental income potential.',
    total_amount: 150000,
    contribution_amount: 15000,
    frequency: 'monthly' as const,
    duration_months: 10,
    max_participants: 10,
    current_participants: 7,
    status: 'forming' as const,
    start_date: '2024-05-01',
    end_date: '2025-03-01',
    admin_id: 'user4',
    created_at: '2024-03-10',
    updated_at: '2024-03-20'
  },
  {
    id: '5',
    name: 'First-Time Buyers Circle',
    description: 'Designed specifically for first-time homebuyers with lower contribution amounts.',
    total_amount: 30000,
    contribution_amount: 3000,
    frequency: 'monthly' as const,
    duration_months: 10,
    max_participants: 10,
    current_participants: 9,
    status: 'forming' as const,
    start_date: '2024-04-15',
    end_date: '2025-02-15',
    admin_id: 'user5',
    created_at: '2024-03-05',
    updated_at: '2024-03-25'
  }
]

export function BrowseROSCAsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedAmount, setSelectedAmount] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)

  const filteredROSCAs = mockAvailableROSCAs.filter(rosca => {
    const matchesSearch = rosca.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rosca.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === 'all' || rosca.status === selectedStatus
    
    const matchesAmount = selectedAmount === 'all' || 
      (selectedAmount === 'low' && rosca.contribution_amount <= 5000) ||
      (selectedAmount === 'medium' && rosca.contribution_amount > 5000 && rosca.contribution_amount <= 10000) ||
      (selectedAmount === 'high' && rosca.contribution_amount > 10000)

    return matchesSearch && matchesStatus && matchesAmount
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Browse ROSCAs
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Discover and join housing finance communities that match your goals
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search ROSCAs by name or description..."
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="forming">Forming</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contribution Amount
                  </label>
                  <select
                    value={selectedAmount}
                    onChange={(e) => setSelectedAmount(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Amounts</option>
                    <option value="low">Under $5,000</option>
                    <option value="medium">$5,000 - $10,000</option>
                    <option value="high">Over $10,000</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <select className="block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="all">All Locations</option>
                    <option value="urban">Urban Areas</option>
                    <option value="suburban">Suburban Areas</option>
                    <option value="coastal">Coastal Areas</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {filteredROSCAs.length} of {mockAvailableROSCAs.length} available ROSCAs
          </p>
        </div>

        {/* ROSCA Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredROSCAs.map((rosca) => (
            <ROSCACard
              key={rosca.id}
              rosca={rosca}
              onClick={() => {
                // Navigate to ROSCA details
                console.log('Navigate to ROSCA:', rosca.id)
              }}
            />
          ))}
        </div>

        {filteredROSCAs.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No ROSCAs found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedStatus('all')
                setSelectedAmount('all')
              }}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Featured Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Why Join a ROSCA?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg w-fit mb-4">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Community Support
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Join like-minded individuals working towards similar housing goals with mutual accountability.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg w-fit mb-4">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Lower Costs
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Avoid high interest rates and fees associated with traditional financing options.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg w-fit mb-4">
                <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Flexible Terms
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Choose contribution amounts and schedules that work with your financial situation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}