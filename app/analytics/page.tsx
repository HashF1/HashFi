"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Download, RefreshCw } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useWallet } from "@/contexts/wallet-context"

export default function Analytics() {
  const { walletData, chartData } = useWallet()
  const [timeRange, setTimeRange] = useState("30d")
  const [isLoading, setIsLoading] = useState(false)

  const performanceMetrics = [
    { label: "Total Return", value: "+24.8%", change: "+2.1%", trend: "up" },
    { label: "Max Drawdown", value: "-8.3%", change: "-1.2%", trend: "down" },
    { label: "Win Rate", value: "73.2%", change: "+4.5%", trend: "up" },
  ]

  const portfolioValueData = [
    { date: "Jan", value: 95000 },
    { date: "Feb", value: 102000 },
    { date: "Mar", value: 108000 },
    { date: "Apr", value: 115000 },
    { date: "May", value: 120000 },
    { date: "Jun", value: 125000 },
  ]

  const yieldPerformanceData = [
    { protocol: "SaucerSwap", apy: 12.5 },
    { protocol: "HeliSwap", apy: 8.7 },
    { protocol: "Pangolin", apy: 15.2 },
    { protocol: "Stader", apy: 6.8 },
    { protocol: "HashPack", apy: 18.9 },
  ]

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate data refresh
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  const handleExport = () => {
    // Simulate data export
    console.log("Exporting analytics data...")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Analytics & Insights
              </h1>
              <p className="text-muted-foreground mt-1">Performance deep dive with key metrics</p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 Days</SelectItem>
                  <SelectItem value="30d">30 Days</SelectItem>
                  <SelectItem value="90d">90 Days</SelectItem>
                  <SelectItem value="1y">1 Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {performanceMetrics.map((metric, index) => (
            <Card key={index} className="bg-gradient-to-br from-card to-card/50 border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div
                    className={`flex items-center text-sm ${
                      metric.trend === "up" ? "text-primary" : "text-destructive"
                    }`}
                  >
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {metric.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Portfolio Value Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Value Trend</CardTitle>
              <CardDescription>Total value locked evolution over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={portfolioValueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0 0)" />
                  <XAxis dataKey="date" stroke="oklch(0.7 0 0)" />
                  <YAxis stroke="oklch(0.7 0 0)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.16 0 0)",
                      border: "1px solid oklch(0.28 0 0)",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`$${(Number(value) / 1000).toFixed(0)}K`, "Portfolio Value"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="oklch(0.55 0.15 250)"
                    strokeWidth={3}
                    dot={{ fill: "oklch(0.55 0.15 250)", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Yield Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Yield Performance</CardTitle>
              <CardDescription>APY comparison across protocols</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={yieldPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0 0)" />
                  <XAxis dataKey="protocol" stroke="oklch(0.7 0 0)" />
                  <YAxis stroke="oklch(0.7 0 0)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.16 0 0)",
                      border: "1px solid oklch(0.28 0 0)",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`${value}%`, "APY"]}
                  />
                  <Bar dataKey="apy" fill="oklch(0.45 0.12 190)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
