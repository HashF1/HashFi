"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  type MockWalletData,
  type MockYieldPassportData,
  type MockTransaction,
  type MockChartData,
  generateMockWalletData,
  generateMockYieldPassportData,
  generateMockTransactions,
  generateMockChartData,
} from "@/lib/mock-data"

interface WalletContextType {
  walletData: MockWalletData | null
  yieldPassportData: MockYieldPassportData | null
  transactions: MockTransaction[]
  chartData: MockChartData | null
  isConnecting: boolean
  isConnected: boolean
  connectWallet: (walletId: string) => Promise<void>
  disconnectWallet: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletData, setWalletData] = useState<MockWalletData | null>(null)
  const [yieldPassportData, setYieldPassportData] = useState<MockYieldPassportData | null>(null)
  const [transactions, setTransactions] = useState<MockTransaction[]>([])
  const [chartData, setChartData] = useState<MockChartData | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const connectWallet = async (walletId: string) => {
    setIsConnecting(true)

    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate fresh mock data on each connection
    const newWalletData = generateMockWalletData()
    setWalletData(newWalletData)
    setYieldPassportData(generateMockYieldPassportData())
    setTransactions(generateMockTransactions())
    setChartData(generateMockChartData())

    localStorage.setItem("hashfi-wallet-connected", "true")
    localStorage.setItem("hashfi-wallet-address", newWalletData.address)

    setIsConnecting(false)
  }

  const disconnectWallet = () => {
    setWalletData(null)
    setYieldPassportData(null)
    setTransactions([])
    setChartData(null)
    localStorage.removeItem("hashfi-wallet-connected")
    localStorage.removeItem("hashfi-wallet-address")
  }

  useEffect(() => {
    const hasConnectedBefore = localStorage.getItem("hashfi-wallet-connected")
    const storedAddress = localStorage.getItem("hashfi-wallet-address")

    if (hasConnectedBefore && storedAddress) {
      // Generate mock data for returning users
      setWalletData(generateMockWalletData())
      setYieldPassportData(generateMockYieldPassportData())
      setTransactions(generateMockTransactions())
      setChartData(generateMockChartData())
    }
  }, [])

  const isConnected = walletData !== null

  return (
    <WalletContext.Provider
      value={{
        walletData,
        yieldPassportData,
        transactions,
        chartData,
        isConnecting,
        isConnected,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
