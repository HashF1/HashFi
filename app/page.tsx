"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Shield, TrendingUp, Users, Zap, Star, Award, Target, Settings, HelpCircle } from "lucide-react"
import { WalletConnectionModal } from "@/components/wallet-connection-modal"
import { OnboardingTutorial } from "@/components/onboarding-tutorial"
import { ScrollAnimationProvider } from "@/components/scroll-animations"
import { useRouter } from "next/navigation"
import { useWallet } from "@/contexts/wallet-context"

export default function HashFiLanding() {
  const [isVisible, setIsVisible] = useState(false)
  const [hederaTvl, setHederaTvl] = useState(100) // $100M+
  const [defiTvl, setDefiTvl] = useState(150) // $150B+
  const [dexsVolume, setDexsVolume] = useState(20) // $20B+
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [isTutorialOpen, setIsTutorialOpen] = useState(false)
  const router = useRouter()
  const { isConnected, disconnectWallet } = useWallet()

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setHederaTvl((prev) => prev + Math.random() * 0.5)
      setDefiTvl((prev) => prev + Math.random() * 2)
      setDexsVolume((prev) => prev + Math.random() * 0.3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleWalletAction = () => {
    if (isConnected) {
      disconnectWallet()
    } else {
      setIsWalletModalOpen(true)
    }
  }

  const handleStartTutorial = () => {
    setIsTutorialOpen(true)
  }

  const handleViewDashboard = () => {
    router.push("/dashboard")
  }

  const handleViewPassport = () => {
    router.push("/passport")
  }

  const handleViewProtocols = () => {
    router.push("/protocols")
  }

  const handleViewSettings = () => {
    router.push("/settings")
  }

  const handleViewHelp = () => {
    router.push("/help")
  }

  const features = [
    {
      icon: Shield,
      title: "Trustless Reputation",
      description: "Build verifiable on-chain credibility without compromising privacy",
    },
    {
      icon: TrendingUp,
      title: "Yield Optimization",
      description: "Access better rates and opportunities based on your proven track record",
    },
    {
      icon: Users,
      title: "Protocol Integration",
      description: "Seamlessly connect with 40+ leading DeFi protocols on Hedera",
    },
    {
      icon: Zap,
      title: "Real-time Scoring",
      description: "Dynamic reputation updates based on your DeFi activity and performance",
    },
  ]

  const useCases = [
    {
      title: "Lending Optimization",
      description: "Get better collateral ratios and interest rates",
      badge: "Lower Risk",
      gradient: "from-primary to-secondary",
    },
    {
      title: "Yield Farming",
      description: "Access exclusive pools and higher APY opportunities",
      badge: "Higher Returns",
      gradient: "from-secondary to-accent",
    },
    {
      title: "RWA Integration",
      description: "Bridge DeFi reputation to real-world asset protocols",
      badge: "Cross-Chain",
      gradient: "from-accent to-primary",
    },
  ]

  return (
    <ScrollAnimationProvider>
      <div className="min-h-screen text-foreground" style={{ backgroundColor: "#2A64E8" }}>
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <img src="/hashfi-logo.png" alt="HashFi Logo" className="w-8 h-8 object-contain" />
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  HashFi
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
                <Button
                  variant="ghost"
                  onClick={handleViewProtocols}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Protocols
                </Button>
                <a href="#docs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Docs
                </a>
                {isConnected && (
                  <>
                    <Button
                      variant="primary"
                      onClick={handleViewDashboard}
                      className="text-muted-foreground hover:text-foreground tracking-normal"
                    >
                      Dashboard
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handleViewPassport}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Passport
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handleViewSettings}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </>
                )}
                <Button
                  variant="ghost"
                  onClick={handleViewHelp}
                  className="text-muted-foreground hover:text-foreground flex-row"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  onClick={handleWalletAction}
                >
                  {isConnected ? "Logout" : "Connect"}
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden floating-shapes">
          <div className="absolute inset-0">
            <div className="absolute inset-0 moving-gradient" />
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#234BA5]/30 to-[#157793]/30 rounded-full blur-3xl animate-float" />
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-[#157793]/30 to-[#2A64E8]/30 rounded-full blur-3xl animate-float-delayed" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#2A64E8]/20 to-[#234BA5]/20 rounded-full blur-2xl animate-pulse-slow" />
            </div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div
              className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="flex justify-center mb-8">
                <img
                  src="/hashfi-logo.png"
                  alt="HashFi Logo"
                  className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 animate-float"
                />
              </div>

              <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm fade-in-up">
                Built on Hedera Hashgraph
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white fade-in-up stagger-1">
                The On-Chain{" "}
                <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                  Reputation
                </span>
                <br />
                for DeFi Users
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed fade-in-up stagger-2">
                Unlock your decentralized identity, prove your credibility, and maximize DeFi opportunities with a
                trustless Yield Passport
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 fade-in-up stagger-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-white text-[#2A64E8] hover:bg-blue-50 py-7 px-10 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  onClick={isConnected ? handleViewPassport : handleWalletAction}
                >
                  {isConnected ? "View Your Passport" : "View Your Yield Passport"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-8 bg-transparent py-7 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  onClick={handleStartTutorial}
                >
                  Get Started
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto fade-in-up stagger-4">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">${hederaTvl.toFixed(0)}M+</div>
                  <div className="text-blue-200">Hedera TVL</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">${defiTvl.toFixed(0)}B+</div>
                  <div className="text-blue-200">DeFi TVL</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">${dexsVolume.toFixed(0)}B+</div>
                  <div className="text-blue-200">DEXs Volume</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 fade-in-up">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Unlock DeFi{" "}
                <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  Opportunities
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Your reputation opens doors to exclusive protocols, better rates, and premium DeFi experiences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <Card
                  key={index}
                  className={`bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group overflow-hidden fade-in-up stagger-${index + 1} hover:scale-105`}
                >
                  <div className={`h-2 bg-gradient-to-r ${useCase.gradient}`} />
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <CardTitle className="text-xl">{useCase.title}</CardTitle>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {useCase.badge}
                      </Badge>
                    </div>
                    <CardDescription className="text-muted-foreground">{useCase.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300"
                      onClick={handleViewProtocols}
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 fade-in-up">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Why Choose{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">HashFi?</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience transparent, verifiable reputation scoring that unlocks new opportunities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={`bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group fade-in-up stagger-${index + 1} hover:scale-105`}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Yield Passport Preview */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">Your Digital Identity</Badge>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Your{" "}
                  <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    Yield Passport
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  A comprehensive view of your DeFi reputation, showcasing your track record, achievements, and
                  credibility across the ecosystem.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-muted-foreground">Pseudonymous identity protection</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                    <span className="text-muted-foreground">Real-time reputation scoring</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-muted-foreground">Shareable achievement badges</span>
                  </div>
                </div>
                <Button
                  className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-white"
                  onClick={isConnected ? handleViewPassport : handleWalletAction}
                >
                  {isConnected ? "View Your Passport" : "Create Your Passport"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div>
                <Card className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">0x</span>
                        </div>
                        <div>
                          <CardTitle className="text-lg">DeFi Pioneer</CardTitle>
                          <CardDescription>Reputation Score: 847</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-primary/10 text-primary border-primary/20">Elite</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Overall Reputation</span>
                        <span className="text-sm font-medium">84.7%</span>
                      </div>
                      <Progress value={84.7} className="h-2" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">$2.4M</div>
                        <div className="text-xs text-muted-foreground">TVL Managed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary mb-1">98.2%</div>
                        <div className="text-xs text-muted-foreground">Repay Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent mb-1">156</div>
                        <div className="text-xs text-muted-foreground">Days Active</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        <Star className="w-3 h-3 mr-1" />
                        Active Farmer
                      </Badge>
                      <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                        <Award className="w-3 h-3 mr-1" />
                        Low Risk
                      </Badge>
                      <Badge variant="secondary" className="bg-accent/10 text-accent">
                        <Target className="w-3 h-3 mr-1" />
                        Protocol Pioneer
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Build Your{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                DeFi Reputation?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of DeFi users who are already leveraging their on-chain reputation to unlock better
              opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-3"
                onClick={handleWalletAction}
              >
                {isConnected ? "View Dashboard" : "Connect Your Wallet"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-3 bg-transparent"
              >
                View Documentation
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <img src="/hashfi-logo.png" alt="HashFi Logo" className="w-8 h-8 object-contain" />
                  <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    HashFi
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  The on-chain reputation protocol for DeFi users on Hedera Hashgraph.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors">
                      Yield Passport
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors">
                      Reputation Scoring
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors">
                      Protocol Integration
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <button onClick={handleViewHelp} className="hover:text-foreground transition-colors">
                      Help Center
                    </button>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors">
                      API Reference
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors">
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Community</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors">
                      Discord
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2024 HashFi. All rights reserved. Built on Hedera Hashgraph.</p>
            </div>
          </div>
        </footer>

        <WalletConnectionModal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} />
        <OnboardingTutorial isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} />
      </div>
    </ScrollAnimationProvider>
  )
}
