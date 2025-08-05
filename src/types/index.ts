export interface User {
  id: string
  email: string
  full_name: string
  phone?: string
  country: string
  preferred_language: 'en' | 'es'
  wallet_address?: string
  kyc_status: 'pending' | 'verified' | 'rejected'
  created_at: string
  updated_at: string
}

export interface ROSCA {
  id: string
  name: string
  description: string
  total_amount: number
  contribution_amount: number
  frequency: 'weekly' | 'monthly'
  duration_months: number
  max_participants: number
  current_participants: number
  status: 'forming' | 'active' | 'completed' | 'cancelled'
  start_date: string
  end_date: string
  admin_id: string
  created_at: string
  updated_at: string
}

export interface ROSCAParticipation {
  id: string
  rosca_id: string
  user_id: string
  position: number
  payout_round?: number
  status: 'active' | 'completed' | 'defaulted'
  total_contributed: number
  total_received: number
  joined_at: string
}

export interface Payment {
  id: string
  rosca_id: string
  user_id: string
  amount: number
  round_number: number
  transaction_hash?: string
  status: 'pending' | 'confirmed' | 'failed'
  due_date: string
  paid_date?: string
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: 'payment_due' | 'payment_received' | 'rosca_update' | 'system'
  read: boolean
  created_at: string
}

export interface WalletConnection {
  address: string
  provider: string
  connected: boolean
}