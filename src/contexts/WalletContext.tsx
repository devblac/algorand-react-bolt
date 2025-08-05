import React, { createContext, useContext, useEffect, useState } from 'react'
import { useWallet } from '@txnlab/use-wallet-react'
import { AlgorandService } from '../lib/algorand'
import { WalletConnection } from '../types'

interface WalletContextType {
  walletConnection: WalletConnection | null
  accountBalance: number
  connectWallet: () => Promise<void>
  disconnectWallet: () => Promise<void>
  refreshBalance: () => Promise<void>
  loading: boolean
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { activeAddress, connectedWallet, connect, disconnect } = useWallet()
  const [walletConnection, setWalletConnection] = useState<WalletConnection | null>(null)
  const [accountBalance, setAccountBalance] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (activeAddress && connectedWallet) {
      setWalletConnection({
        address: activeAddress,
        provider: connectedWallet.id,
        connected: true
      })
      refreshBalance()
    } else {
      setWalletConnection(null)
      setAccountBalance(0)
    }
  }, [activeAddress, connectedWallet])

  const connectWallet = async () => {
    setLoading(true)
    try {
      await connect()
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const disconnectWallet = async () => {
    setLoading(true)
    try {
      await disconnect()
      setWalletConnection(null)
      setAccountBalance(0)
    } catch (error) {
      console.error('Failed to disconnect wallet:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const refreshBalance = async () => {
    if (!activeAddress) return

    try {
      const accountInfo = await AlgorandService.getAccountInfo(activeAddress)
      setAccountBalance(accountInfo.balance)
    } catch (error) {
      console.error('Failed to refresh balance:', error)
    }
  }

  const value = {
    walletConnection,
    accountBalance,
    connectWallet,
    disconnectWallet,
    refreshBalance,
    loading
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWalletContext() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a WalletProvider')
  }
  return context
}