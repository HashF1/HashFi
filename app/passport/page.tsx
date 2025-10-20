"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Shield, Calendar, ExternalLink, Download, Share2, Copy, CheckCircle, Activity, Globe } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

export default function YieldPassport() {
  const [isSharing, setIsSharing] = useState(false)
  const [copied, setCopied] = useState(false)

  // Mock user data
  const userProfile = {
    address: "0x1234...5678",
    username: "DeFi Pioneer",
    joinDate: "March 2024",
    avatar: "/defi-user-avatar.png",
    reputationScore: 847,
    reputationLevel: "Elite",
    successRate: 98.2,
    daysActive: 156,
  }

  const reputationHistory = [
    { month: "Jan", score: 720 },
    { month: "Feb", score: 745 },
    { month: "Mar", score: 780 },
    { month: "Apr", score: 810 },
    { month: "May", score: 825 },
    { month: "Jun", score: 847 },
  ]

  const skillRadar = [
    { skill: "Lending", score: 85, fullMark: 100 },
    { skill: "Yield Farming", score: 92, fullMark: 100 },
    { skill: "Staking", score: 78, fullMark: 100 },
    { skill: "Liquidity", score: 88, fullMark: 100 },
    { skill: "Risk Management", score: 95, fullMark: 100 },
    { skill: "Protocol Adoption", score: 90, fullMark: 100 },
  ]

  const protocolHistory = [
    {
      protocol: "Hedera Lending",
      firstUsed: "2024-03-15",
      totalVolume: "$850,000",
      transactions: 45,
      status: "active",
      reputation: 92,
    },
    {
      protocol: "HashPack Yield",
      firstUsed: "2024-03-20",
      totalVolume: "$650,000",
      transactions: 32,
      status: "active",
      reputation: 88,
    },
    {
      protocol: "SaucerSwap",
      firstUsed: "2024-04-01",
      totalVolume: "$420,000",
      transactions: 78,
      status: "active",
      reputation: 85,
    },
    {
      protocol: "Stader Staking",
      firstUsed: "2024-04-15",
      totalVolume: "$380,000",
      transactions: 12,
      status: "active",
      reputation: 90,
    },
  ]

  const handleShare = async () => {
    setIsSharing(true)
    // Simulate sharing process
    setTimeout(() => {
      setIsSharing(false)
    }, 1000)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://hashfi.app/passport/${userProfile.address}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar className="w-20 h-20 border-2 border-primary/20">
                <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.username} />
                <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white text-xl font-bold">
                  {userProfile.username
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">{userProfile.username}</h1>
                <p className="text-muted-foreground">{userProfile.address}</p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge className="bg-primary/10 text-primary border-primary/20">{userProfile.reputationLevel}</Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Joined {userProfile.joinDate}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleCopyLink} className="flex items-center gap-2 bg-transparent">
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy Link"}
              </Button>
              <Button
                variant="outline"
                onClick={handleShare}
                disabled={isSharing}
                className="flex items-center gap-2 bg-transparent"
              >
                <Share2 className="h-4 w-4" />
                {isSharing ? "Sharing..." : "Share"}
              </Button>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Reputation Score</p>
                  <p className="text-3xl font-bold text-primary">{userProfile.reputationScore}</p>
                </div>
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <Progress value={(userProfile.reputationScore / 1000) * 100} className="mt-3 h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                  <p className="text-3xl font-bold text-accent">{userProfile.successRate}%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Repayment & execution rate</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-muted/10 to-muted/5 border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Days Active</p>
                  <p className="text-3xl font-bold">{userProfile.daysActive}</p>
                </div>
                <Activity className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Consistent DeFi activity</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[300px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="protocols">Protocols</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Reputation Growth */}
              <Card>
                <CardHeader>
                  <CardTitle>Reputation Growth</CardTitle>
                  <CardDescription>Your reputation score progression over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={reputationHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0 0)" />
                      <XAxis dataKey="month" stroke="oklch(0.7 0 0)" />
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
                        dot={{ fill: "oklch(0.55 0.15 250)", strokeWidth: 2, r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* DeFi Skills Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle>DeFi Skills Assessment</CardTitle>
                  <CardDescription>Your expertise across different DeFi categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={skillRadar}>
                      <PolarGrid stroke="oklch(0.28 0 0)" />
                      <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12, fill: "oklch(0.7 0 0)" }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: "oklch(0.7 0 0)" }} />
                      <Radar
                        name="Skills"
                        dataKey="score"
                        stroke="oklch(0.55 0.15 250)"
                        fill="oklch(0.55 0.15 250)"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {skillRadar.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{skill.skill}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-muted rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-primary to-accent"
                              style={{ width: `${skill.score}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8">{skill.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="protocols" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Protocol History</CardTitle>
                <CardDescription>Your interaction history across DeFi protocols</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {protocolHistory.map((protocol, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                          <Globe className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{protocol.protocol}</h3>
                          <p className="text-sm text-muted-foreground">First used: {protocol.firstUsed}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium">{protocol.totalVolume}</p>
                            <p className="text-sm text-muted-foreground">{protocol.transactions} transactions</p>
                          </div>
                          <div>
                            <Badge
                              className={`${
                                protocol.status === "active"
                                  ? "bg-primary/10 text-primary"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {protocol.status}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-1">Rep: {protocol.reputation}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
