"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  Shield,
  Star,
  Award,
  Target,
  User,
  BarChart3,
  ArrowRight,
  Activity,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { useRouter } from "next/navigation"
import { useWallet } from "@/contexts/wallet-context"

export default function Dashboard() {
  const { walletData, yieldPassportData } = useWallet()
  const router = useRouter()

  const reputationScore = yieldPassportData?.reputationScore || 847
  const scoreChange = +12
  const totalTVL = yieldPassportData?.achievements.totalTVL || 125000
  const monthlyYield = 18750
  const riskLevel = "Low"

  const reputationHistory = [
    { date: "Jan", score: 720 },
    { date: "Feb", score: 745 },
    { date: "Mar", score: 780 },
    { date: "Apr", score: 810 },
    { date: "May", score: 825 },
    { date: "Jun", score: 847 },
  ]

  const protocolDistribution = [
    { name: "Lending", value: 45, color: "oklch(0.55 0.15 250)" },
    { name: "Yield Farming", value: 30, color: "oklch(0.45 0.12 190)" },
    { name: "Staking", value: 15, color: "oklch(0.35 0.12 240)" },
    { name: "Liquidity", value: 10, color: "oklch(0.65 0.18 200)" },
  ]

  const portfolioValueHistory = [
    { date: "Jan", value: 95000 },
    { date: "Feb", value: 102000 },
    { date: "Mar", value: 108000 },
    { date: "Apr", value: 115000 },
    { date: "May", value: 120000 },
    { date: "Jun", value: 125000 },
  ]

  const recentTransactions = [
    { type: "Deposit", protocol: "SaucerSwap", amount: "$5,000", date: "2024-06-15", status: "Completed" },
    { type: "Yield Claim", protocol: "HeliSwap", amount: "$320", date: "2024-06-14", status: "Completed" },
    { type: "Stake", protocol: "Stader", amount: "$2,500", date: "2024-06-13", status: "Completed" },
    { type: "Withdraw", protocol: "Pangolin", amount: "$1,200", date: "2024-06-12", status: "Completed" },
    { type: "Swap", protocol: "HashPack", amount: "$800", date: "2024-06-11", status: "Completed" },
  ]

  const featuredAchievements = [
    { icon: Star, title: "Active Farmer", description: "100+ days of yield farming", earned: true },
    { icon: Award, title: "Low Risk Borrower", description: "98%+ repayment rate", earned: true },
    { icon: Target, title: "Protocol Pioneer", description: "Early adopter of 5+ protocols", earned: true },
  ]

  const handleViewPassport = () => {
    router.push("/passport")
  }

  const handleViewAnalytics = () => {
    router.push("/analytics")
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-primary"
      case "pending":
        return "text-yellow-500"
      case "failed":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">Quick snapshot of your DeFi activity</p>
            </div>
            <div className="flex items-center gap-4">
              {walletData?.isConnected && (
                <Badge className="bg-primary/10 text-primary border-primary/20">Connected</Badge>
              )}
              <Button
                variant="outline"
                onClick={handleViewAnalytics}
                className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Deep Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Reputation Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-primary">{reputationScore}</div>
                <div className={`flex items-center text-sm ${scoreChange >= 0 ? "text-primary" : "text-destructive"}`}>
                  {scoreChange >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {scoreChange >= 0 ? "+" : ""}
                  {scoreChange}
                </div>
              </div>
              <Progress value={(reputationScore / 1000) * 100} className="mt-3 h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total TVL</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-secondary">${(totalTVL / 1000).toFixed(0)}K</div>
                <div className="flex items-center text-sm text-primary">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +8.2%
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Across 12 protocols</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Yield</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-accent">${monthlyYield.toLocaleString()}</div>
                <div className="flex items-center text-sm text-primary">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12.5%
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">7.8% APY average</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-muted/10 to-muted/5 border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Risk Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-primary">{riskLevel}</div>
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Well diversified portfolio</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Reputation Trend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Reputation Trend</CardTitle>
                  <CardDescription>Your reputation score over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={reputationHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0 0)" />
                      <XAxis dataKey="date" stroke="oklch(0.7 0 0)" />
                      <YAxis stroke="oklch(0.7 0 0)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "oklch(0.16 0 0)",
                          border: "1px solid oklch(0.28 0 0)",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="oklch(0.55 0.15 250)"
                        strokeWidth={3}
                        dot={{ fill: "oklch(0.55 0.15 250)", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Protocol Distribution Donut Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Protocol Distribution</CardTitle>
                  <CardDescription>Your activity breakdown by protocol type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={protocolDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {protocolDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "oklch(0.16 0 0)",
                          border: "1px solid oklch(0.28 0 0)",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {protocolDistribution.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-muted-foreground">{item.name}</span>
                        <span className="text-sm font-medium ml-auto">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Value</CardTitle>
                <CardDescription>TVL evolution over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={portfolioValueHistory}>
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
                      stroke="oklch(0.45 0.12 190)"
                      strokeWidth={3}
                      dot={{ fill: "oklch(0.45 0.12 190)", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Latest DeFi Transactions</CardTitle>
                <CardDescription>Your recent protocol interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                          <Activity className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.type}</p>
                          <p className="text-sm text-muted-foreground">{transaction.protocol}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{transaction.amount}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                          <Badge variant="secondary" className={`text-xs ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>Your latest DeFi milestones</CardDescription>
              </div>
              <Button
                variant="outline"
                onClick={handleViewPassport}
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
              >
                <User className="h-4 w-4 mr-2" />
                See All in Passport
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredAchievements.map((achievement, index) => (
                <Card
                  key={index}
                  className="bg-primary/5 border-primary/20 hover:border-primary/40 transition-all duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-r from-primary to-accent">
                      <achievement.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                    <Badge className="bg-primary/10 text-primary">Earned</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
