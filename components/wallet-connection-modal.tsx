"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Wallet, Shield, Zap, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"
import { useWallet } from "@/contexts/wallet-context"

interface WalletConnectionModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WalletConnectionModal({ isOpen, onClose }: WalletConnectionModalProps) {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "connecting" | "connected" | "error">("idle")
  const [selectedNetwork, setSelectedNetwork] = useState<"mainnet" | "testnet">("mainnet")

  const { connectWallet, isConnecting } = useWallet()

  const wallets = [
    {
      id: "metamask",
      name: "MetaMask",
      description: "Connect using browser extension",
      icon: "🦊",
      available: true,
    },
    {
      id: "hedera-wallet",
      name: "Hedera Wallet",
      description: "Native Hedera wallet support",
      icon: "ℏ",
      available: true,
    },
    {
      id: "walletconnect",
      name: "WalletConnect",
      description: "Connect with mobile wallet",
      icon: "📱",
      available: true,
    },
  ]

  const handleWalletConnect = async (walletId: string) => {
    setSelectedWallet(walletId)
    setConnectionStatus("connecting")

    try {
      await connectWallet(walletId)
      setConnectionStatus("connected")
      setTimeout(() => {
        onClose()
        setConnectionStatus("idle")
        setSelectedWallet(null)
      }, 2000)
    } catch (error) {
      setConnectionStatus("error")
    }
  }

  const handleNetworkChange = (network: "mainnet" | "testnet") => {
    setSelectedNetwork(network)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            Connect Your Wallet
          </DialogTitle>
          <DialogDescription>
            Choose your preferred wallet to access HashFi and start building your DeFi reputation
          </DialogDescription>
        </DialogHeader>

        {connectionStatus === "idle" && (
          <div className="space-y-6">
            {/* Network Selection */}
            <div>
              <h3 className="text-sm font-medium mb-3">Select Network</h3>
              <div className="flex gap-2">
                <Button
                  variant={selectedNetwork === "mainnet" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleNetworkChange("mainnet")}
                  className={
                    selectedNetwork === "mainnet"
                      ? "bg-primary text-primary-foreground"
                      : "border-border hover:border-primary"
                  }
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Mainnet
                </Button>
                <Button
                  variant={selectedNetwork === "testnet" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleNetworkChange("testnet")}
                  className={
                    selectedNetwork === "testnet"
                      ? "bg-secondary text-secondary-foreground"
                      : "border-border hover:border-secondary"
                  }
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Testnet
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {selectedNetwork === "mainnet"
                  ? "Connect to Hedera mainnet for live DeFi interactions"
                  : "Use testnet for development and testing purposes"}
              </p>
            </div>

            <Separator />

            {/* Wallet Options */}
            <div>
              <h3 className="text-sm font-medium mb-3">Choose Wallet</h3>
              <div className="space-y-3">
                {wallets.map((wallet) => (
                  <Card
                    key={wallet.id}
                    className={`cursor-pointer transition-all duration-200 hover:border-primary/50 ${
                      !wallet.available ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => wallet.available && handleWalletConnect(wallet.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{wallet.icon}</div>
                          <div>
                            <CardTitle className="text-sm">{wallet.name}</CardTitle>
                            <CardDescription className="text-xs">{wallet.description}</CardDescription>
                          </div>
                        </div>
                        {wallet.available ? (
                          <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                            Available
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs">
                            Coming Soon
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Multi-chain Notice */}
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <ExternalLink className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-accent">Multi-chain Expansion Coming Soon</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    HashFi will soon support Ethereum, Polygon, and other major DeFi networks
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {(connectionStatus === "connecting" || isConnecting) && (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Connecting to {selectedWallet}</h3>
            <p className="text-sm text-muted-foreground">Generating mock wallet data...</p>
          </div>
        )}

        {connectionStatus === "connected" && (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Successfully Connected!</h3>
            <p className="text-sm text-muted-foreground">Welcome to HashFi. Redirecting to your dashboard...</p>
          </div>
        )}

        {connectionStatus === "error" && (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Connection Failed</h3>
            <p className="text-sm text-muted-foreground mb-4">Unable to connect to your wallet. Please try again.</p>
            <Button onClick={() => setConnectionStatus("idle")} variant="outline">
              Try Again
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
