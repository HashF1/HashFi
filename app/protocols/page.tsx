"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  ExternalLink,
  Star,
  TrendingUp,
  Shield,
  Zap,
  DollarSign,
  Users,
  Activity,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowRight,
  Plus,
} from "lucide-react"

export default function ProtocolHub() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [sortBy, setSortBy] = useState("reputation")

  const protocols = [
    {
      id: 1,
      name: "Stader Staking",
      category: "Staking",
      description: "Liquid staking solutions for HBAR with instant liquidity",
      logo: "/placeholder.svg?height=40&width=40&text=ST",
      tvl: "$156M",
      apy: "7.2%",
      reputationBoost: "+12",
      userCount: "9.8K",
      status: "active",
      integrated: true,
      riskLevel: "low",
      features: ["Liquid Staking", "Validator Selection", "Rewards Distribution"],
      benefits: {
        reputation: "Long-term staking rewards",
        rates: "Higher staking yields",
        collateral: "Staked tokens as collateral",
      },
    },
    {
      id: 2,
      name: "SaucerSwap",
      category: "DEX",
      description: "Leading decentralized exchange on Hedera with deep liquidity",
      logo: "/placeholder.svg?height=40&width=40&text=SS",
      tvl: "$67M",
      apy: "6.8%",
      reputationBoost: "+10",
      userCount: "15.2K",
      status: "active",
      integrated: true,
      riskLevel: "low",
      features: ["AMM Trading", "Liquidity Pools", "Governance"],
      benefits: {
        reputation: "Trading volume contributes to score",
        rates: "Reduced trading fees",
        collateral: "LP token collateral accepted",
      },
    },
    {
      id: 3,
      name: "Tokeny",
      category: "RWA",
      description: "Compliant RWA tokenization for security tokens",
      logo: "/placeholder.svg?height=40&width=40&text=TK",
      tvl: "$34M",
      apy: "9.5%",
      reputationBoost: "+22",
      userCount: "3.4K",
      status: "active",
      integrated: true,
      riskLevel: "medium",
      features: ["Asset Tokenization", "Compliance Framework", "Security Tokens"],
      benefits: {
        reputation: "Premium tier access for compliant assets",
        rates: "Institutional-grade tokenization rates",
        collateral: "Tokenized RWA collateral support",
      },
    },
  ]

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Lending", label: "Lending" },
    { value: "Yield Farming", label: "Yield Farming" },
    { value: "DEX", label: "DEX" },
    { value: "Staking", label: "Staking" },
    { value: "RWA", label: "Real World Assets" },
  ]

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "beta", label: "Beta" },
    { value: "coming-soon", label: "Coming Soon" },
  ]

  const sortOptions = [
    { value: "reputation", label: "Reputation Boost" },
    { value: "tvl", label: "TVL" },
    { value: "apy", label: "APY" },
    { value: "users", label: "User Count" },
  ]

  const filteredProtocols = protocols
    .filter((protocol) => {
      const matchesSearch =
        protocol.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        protocol.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || protocol.category === selectedCategory
      const matchesStatus = selectedStatus === "all" || protocol.status === selectedStatus
      return matchesSearch && matchesCategory && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "tvl":
          return Number.parseFloat(b.tvl.replace(/[$M]/g, "")) - Number.parseFloat(a.tvl.replace(/[$M]/g, ""))
        case "apy":
          return Number.parseFloat(b.apy.replace("%", "")) - Number.parseFloat(a.apy.replace("%", ""))
        case "users":
          return Number.parseFloat(b.userCount.replace(/[K]/g, "")) - Number.parseFloat(a.userCount.replace(/[K]/g, ""))
        default:
          return (
            Number.parseInt(b.reputationBoost.replace("+", "")) - Number.parseInt(a.reputationBoost.replace("+", ""))
          )
      }
    })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-primary" />
      case "beta":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "coming-soon":
        return <AlertTriangle className="h-4 w-4 text-muted-foreground" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-primary/10 text-primary">Active</Badge>
      case "beta":
        return <Badge className="bg-yellow-500/10 text-yellow-500">Beta</Badge>
      case "coming-soon":
        return <Badge variant="secondary">Coming Soon</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return <Badge className="bg-primary/10 text-primary">Low Risk</Badge>
      case "medium":
        return <Badge className="bg-yellow-500/10 text-yellow-500">Medium Risk</Badge>
      case "high":
        return <Badge className="bg-destructive/10 text-destructive">High Risk</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Lending":
        return <DollarSign className="h-5 w-5" />
      case "Yield Farming":
        return <TrendingUp className="h-5 w-5" />
      case "DEX":
        return <Activity className="h-5 w-5" />
      case "Staking":
        return <Shield className="h-5 w-5" />
      case "RWA":
        return <Star className="h-5 w-5" />
      default:
        return <Zap className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Protocol Integration Hub
              </h1>
              <p className="text-muted-foreground mt-2">
                Discover and connect with DeFi protocols that recognize your HashFi reputation
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                {protocols.filter((p) => p.integrated).length} Integrated
              </Badge>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                <Plus className="h-4 w-4 mr-2" />
                Request Integration
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search protocols..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((sort) => (
                      <SelectItem key={sort.value} value={sort.value}>
                        {sort.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Protocol Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProtocols.map((protocol) => (
            <Card key={protocol.id} className="hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={protocol.logo || "/placeholder.svg"} alt={protocol.name} />
                      <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white font-bold">
                        {protocol.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-xl">{protocol.name}</CardTitle>
                        {protocol.integrated && (
                          <Badge className="bg-primary/10 text-primary text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Integrated
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(protocol.category)}
                        <span className="text-sm text-muted-foreground">{protocol.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(protocol.status)}
                    {getRiskBadge(protocol.riskLevel)}
                  </div>
                </div>
                <CardDescription className="mt-3">{protocol.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{protocol.tvl}</div>
                    <div className="text-xs text-muted-foreground">TVL</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-secondary">{protocol.apy}</div>
                    <div className="text-xs text-muted-foreground">APY</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-accent">{protocol.reputationBoost}</div>
                    <div className="text-xs text-muted-foreground">Rep Boost</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{protocol.userCount}</div>
                    <div className="text-xs text-muted-foreground">Users</div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Key Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {protocol.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Reputation Benefits */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Reputation Benefits</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{protocol.benefits.reputation}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-secondary" />
                      <span className="text-muted-foreground">{protocol.benefits.rates}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-accent" />
                      <span className="text-muted-foreground">{protocol.benefits.collateral}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  {protocol.integrated ? (
                    <Button className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                      Connect & Earn
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      disabled={protocol.status === "coming-soon"}
                    >
                      {protocol.status === "coming-soon" ? "Coming Soon" : "Request Access"}
                    </Button>
                  )}
                  <Button variant="outline" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Integration Stats */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Integration Overview</CardTitle>
            <CardDescription>Your protocol interaction summary and reputation impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {protocols.filter((p) => p.integrated).length}
                </div>
                <div className="text-sm text-muted-foreground">Active Integrations</div>
                <Progress
                  value={(protocols.filter((p) => p.integrated).length / protocols.length) * 100}
                  className="mt-2 h-2"
                />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">
                  +
                  {protocols
                    .filter((p) => p.integrated)
                    .reduce((sum, p) => sum + Number.parseInt(p.reputationBoost.replace("+", "")), 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Rep Boost Available</div>
                <Progress value={75} className="mt-2 h-2" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">
                  {protocols.filter((p) => p.status === "coming-soon").length}
                </div>
                <div className="text-sm text-muted-foreground">Coming Soon</div>
                <Progress value={33} className="mt-2 h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration Guide */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How Protocol Integration Works</CardTitle>
            <CardDescription>Understanding how your HashFi reputation unlocks protocol benefits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Connect Protocol</h3>
                <p className="text-sm text-muted-foreground">
                  Link your HashFi reputation to supported protocols and verify your identity
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Earn Benefits</h3>
                <p className="text-sm text-muted-foreground">
                  Access better rates, reduced collateral requirements, and exclusive features
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Build Reputation</h3>
                <p className="text-sm text-muted-foreground">
                  Your protocol interactions contribute back to your overall HashFi reputation score
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
