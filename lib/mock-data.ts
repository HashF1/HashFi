// Mock data service for HashFi wallet simulation
export interface MockWalletData {
  address: string
  balances: {
    ETH: number
    HBAR: number
    USDT: number
  }
  isConnected: boolean
}

export interface MockYieldPassportData {
  reputationScore: number
  reputationLevel: string
  badges: string[]
  achievements: {
    totalTVL: number
    lendingHistory: number
    yieldFarming: number
    stakingRewards: number
  }
}

export interface MockTransaction {
  hash: string
  type: "lend" | "borrow" | "stake" | "claim"
  amount: number
  token: string
  date: string
  status: "completed" | "pending"
}

export interface MockChartData {
  tvlOverTime: Array<{ date: string; value: number }>
  yieldPerformance: Array<{ protocol: string; apy: number; tvl: number }>
  borrowingRatios: Array<{ month: string; borrowed: number; repaid: number }>
}

// Generate mock wallet data
export const generateMockWalletData = (): MockWalletData => ({
  address: "0x1234...ABCD",
  balances: {
    ETH: 2.54,
    HBAR: 520.32,
    USDT: 1340.89,
  },
  isConnected: true,
})

// Generate mock Yield Passport data
export const generateMockYieldPassportData = (): MockYieldPassportData => ({
  reputationScore: 87,
  reputationLevel: "Advanced DeFi User",
  badges: ["Active Farmer", "Low-Risk Borrower", "Protocol Pioneer"],
  achievements: {
    totalTVL: 125000,
    lendingHistory: 15,
    yieldFarming: 3,
    stakingRewards: 2340,
  },
})

// Generate mock transaction data
export const generateMockTransactions = (): MockTransaction[] => [
  {
    hash: "0xabc123...def456",
    type: "lend",
    amount: 1500,
    token: "USDT",
    date: "2024-01-15",
    status: "completed",
  },
  {
    hash: "0x789xyz...123abc",
    type: "stake",
    amount: 50.5,
    token: "HBAR",
    date: "2024-01-14",
    status: "completed",
  },
  {
    hash: "0xdef789...456ghi",
    type: "claim",
    amount: 125.75,
    token: "USDT",
    date: "2024-01-13",
    status: "completed",
  },
  {
    hash: "0x456jkl...789mno",
    type: "borrow",
    amount: 800,
    token: "USDT",
    date: "2024-01-12",
    status: "completed",
  },
  {
    hash: "0x123pqr...456stu",
    type: "lend",
    amount: 2.1,
    token: "ETH",
    date: "2024-01-11",
    status: "pending",
  },
]

// Generate mock chart data
export const generateMockChartData = (): MockChartData => ({
  tvlOverTime: [
    { date: "2023-12-15", value: 95000 },
    { date: "2023-12-20", value: 102000 },
    { date: "2023-12-25", value: 98000 },
    { date: "2023-12-30", value: 110000 },
    { date: "2024-01-05", value: 118000 },
    { date: "2024-01-10", value: 125000 },
    { date: "2024-01-15", value: 125000 },
  ],
  yieldPerformance: [
    { protocol: "SaucerSwap", apy: 12.5, tvl: 45000 },
    { protocol: "HeliSwap", apy: 8.7, tvl: 32000 },
    { protocol: "Pangolin", apy: 15.2, tvl: 28000 },
    { protocol: "Stader", apy: 6.8, tvl: 20000 },
  ],
  borrowingRatios: [
    { month: "Oct", borrowed: 15000, repaid: 12000 },
    { month: "Nov", borrowed: 22000, repaid: 18000 },
    { month: "Dec", borrowed: 18000, repaid: 20000 },
    { month: "Jan", borrowed: 25000, repaid: 23000 },
  ],
})
