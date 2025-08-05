import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { NetworkId, WalletId, WalletManager, WalletProvider } from '@txnlab/use-wallet-react'
import { WalletUIProvider } from '@txnlab/use-wallet-ui-react'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { WalletProvider as CustomWalletProvider } from './contexts/WalletContext'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { LoginForm } from './components/auth/LoginForm'
import { RegisterForm } from './components/auth/RegisterForm'
import { DashboardPage } from './pages/DashboardPage'
import { BrowseROSCAsPage } from './pages/BrowseROSCAsPage'
import { HelpPage } from './pages/HelpPage'

const walletManager = new WalletManager({
  wallets: [
    WalletId.PERA,
    WalletId.DEFLY,
    WalletId.LUTE,
    WalletId.EXODUS,
    {
      id: WalletId.WALLETCONNECT,
      options: { projectId: 'fcfde0713d43baa0d23be0773c80a72b' },
    },
  ],
  defaultNetwork: NetworkId.TESTNET,
})

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  
  return user ? <>{children}</> : <Navigate to="/login" />
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  
  return user ? <Navigate to="/dashboard" /> : <>{children}</>
}

function App() {
  return (
    <Router>
      <WalletProvider manager={walletManager}>
        <WalletUIProvider>
          <AuthProvider>
            <CustomWalletProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Layout><HomePage /></Layout>} />
                <Route path="/help" element={<Layout><HelpPage /></Layout>} />
                <Route 
                  path="/login" 
                  element={
                    <PublicRoute>
                      <LoginForm />
                    </PublicRoute>
                  } 
                />
                <Route 
                  path="/register" 
                  element={
                    <PublicRoute>
                      <RegisterForm />
                    </PublicRoute>
                  } 
                />
                
                {/* Protected Routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Layout><DashboardPage /></Layout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/browse" 
                  element={
                    <ProtectedRoute>
                      <Layout><BrowseROSCAsPage /></Layout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/roscas" 
                  element={
                    <ProtectedRoute>
                      <Layout><DashboardPage /></Layout>
                    </ProtectedRoute>
                  } 
                />
              </Routes>
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                }}
              />
            </CustomWalletProvider>
          </AuthProvider>
        </WalletUIProvider>
      </WalletProvider>
    </Router>
  )
}

export default App
