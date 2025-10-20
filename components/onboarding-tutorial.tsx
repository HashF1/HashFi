"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Star, TrendingUp, Shield, Users, CheckCircle } from "lucide-react"

interface OnboardingTutorialProps {
  isOpen: boolean
  onClose: () => void
}

export function OnboardingTutorial({ isOpen, onClose }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Welcome to HashFi",
      description: "Your journey to building DeFi reputation starts here",
      icon: Star,
      content: (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto">
            <Star className="h-8 w-8 text-white" />
          </div>
          <p className="text-muted-foreground">
            HashFi tracks your DeFi activities across Hedera protocols to build a trustless reputation score that
            unlocks better opportunities.
          </p>
        </div>
      ),
    },
    {
      title: "How Reputation Works",
      description: "Understanding your on-chain credibility score",
      icon: TrendingUp,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Activity Tracking</p>
                <p className="text-xs text-muted-foreground">Lending, borrowing, yield farming</p>
              </CardContent>
            </Card>
            <Card className="bg-secondary/10 border-secondary/20">
              <CardContent className="p-4 text-center">
                <Shield className="h-6 w-6 text-secondary mx-auto mb-2" />
                <p className="text-sm font-medium">Risk Assessment</p>
                <p className="text-xs text-muted-foreground">Repayment history, collateral ratios</p>
              </CardContent>
            </Card>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Your reputation score is calculated in real-time based on your DeFi interactions and performance metrics.
          </p>
        </div>
      ),
    },
    {
      title: "Your Yield Passport",
      description: "Your portable DeFi identity",
      icon: Shield,
      content: (
        <div className="space-y-4">
          <Card className="bg-gradient-to-br from-card/80 to-card/40">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">YP</span>
                  </div>
                  <div>
                    <CardTitle className="text-sm">Your Passport</CardTitle>
                    <CardDescription className="text-xs">Score: Building...</CardDescription>
                  </div>
                </div>
                <Badge className="bg-accent/10 text-accent text-xs">New</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Reputation Progress</span>
                  <span>0%</span>
                </div>
                <Progress value={0} className="h-1" />
              </div>
            </CardContent>
          </Card>
          <p className="text-sm text-muted-foreground text-center">
            Start using DeFi protocols to build your reputation and unlock exclusive opportunities.
          </p>
        </div>
      ),
    },
    {
      title: "Protocol Benefits",
      description: "What your reputation unlocks",
      icon: Users,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Better Interest Rates</p>
                <p className="text-xs text-muted-foreground">Lower borrowing costs, higher lending yields</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-lg border border-secondary/10">
              <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Exclusive Access</p>
                <p className="text-xs text-muted-foreground">Premium pools and early protocol access</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg border border-accent/10">
              <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Reduced Collateral</p>
                <p className="text-xs text-muted-foreground">Lower collateral requirements for trusted users</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onClose()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  const CurrentStepIcon = steps[currentStep].icon

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <CurrentStepIcon className="h-5 w-5 text-primary" />
                {steps[currentStep].title}
              </DialogTitle>
              <DialogDescription>{steps[currentStep].description}</DialogDescription>
            </div>
            <Badge variant="secondary" className="text-xs">
              {currentStep + 1} of {steps.length}
            </Badge>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </DialogHeader>

        <div className="py-6">{steps[currentStep].content}</div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button onClick={nextStep} className="flex items-center gap-2 bg-primary hover:bg-primary/90">
            {currentStep === steps.length - 1 ? "Get Started" : "Next"}
            {currentStep < steps.length - 1 && <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>

        <div className="text-center">
          <Button variant="ghost" onClick={onClose} className="text-xs text-muted-foreground">
            Skip tutorial
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
