"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  HelpCircle,
  Search,
  Book,
  MessageCircle,
  Mail,
  ExternalLink,
  ChevronRight,
  Shield,
  TrendingUp,
  Globe,
  FileText,
  Video,
  Headphones,
} from "lucide-react"

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  })

  const faqCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Book,
      questions: [
        {
          question: "What is HashFi and how does it work?",
          answer:
            "HashFi is a decentralized on-chain reputation protocol for DeFi users built on Hedera Hashgraph. It creates a trustless Yield Passport that tracks your DeFi activities, builds your reputation score, and unlocks better rates and opportunities across protocols.",
        },
        {
          question: "How do I connect my wallet to HashFi?",
          answer:
            "Click the 'Connect Wallet' button and choose from supported wallets like MetaMask, Hedera Wallet, or WalletConnect. Make sure you're on the correct network (Hedera mainnet or testnet) before connecting.",
        },
        {
          question: "What is a Yield Passport?",
          answer:
            "Your Yield Passport is your portable DeFi identity that contains your reputation score, achievement badges, protocol interaction history, and verified credentials. It proves your credibility across the DeFi ecosystem.",
        },
        {
          question: "How is my reputation score calculated?",
          answer:
            "Your reputation score is calculated based on multiple factors including transaction history, protocol interactions, lending/borrowing behavior, yield farming activities, and risk management practices. The algorithm considers both quantity and quality of your DeFi activities.",
        },
      ],
    },
    {
      id: "wallet-security",
      title: "Wallet & Security",
      icon: Shield,
      questions: [
        {
          question: "Is HashFi safe to use?",
          answer:
            "Yes, HashFi is built with security as a priority. We use read-only access to your wallet data, never store private keys, and all smart contracts are audited. Your funds remain in your control at all times.",
        },
        {
          question: "What wallet permissions does HashFi need?",
          answer:
            "HashFi only needs read permissions to view your transaction history and current balances. We never request permissions to move funds or sign transactions on your behalf.",
        },
        {
          question: "Can I disconnect my wallet anytime?",
          answer:
            "Yes, you can disconnect your wallet at any time from the Settings page. This will remove access to your data, but your on-chain reputation history will remain available for future connections.",
        },
        {
          question: "What happens if I lose access to my wallet?",
          answer:
            "Your reputation data is stored on-chain and tied to your wallet address. If you lose access to your wallet, you'll need to recover it using your seed phrase to regain access to your HashFi profile.",
        },
      ],
    },
    {
      id: "features",
      title: "Features & Usage",
      icon: TrendingUp,
      questions: [
        {
          question: "Which protocols does HashFi support?",
          answer:
            "HashFi currently supports major Hedera DeFi protocols including SaucerSwap, HeliSwap, Stader, and more. We're continuously adding new protocol integrations based on user demand and ecosystem growth.",
        },
        {
          question: "How do I improve my reputation score?",
          answer:
            "Engage actively with DeFi protocols, maintain good borrowing/lending practices, diversify your activities, complete transactions successfully, and participate in governance. Consistent, responsible DeFi behavior improves your score over time.",
        },
        {
          question: "What benefits do I get from a higher reputation score?",
          answer:
            "Higher reputation scores unlock better interest rates, reduced collateral requirements, access to exclusive opportunities, priority in protocol launches, and enhanced credibility when interacting with new protocols.",
        },
        {
          question: "Can I share my Yield Passport with others?",
          answer:
            "Yes, you can make your Yield Passport public and share it with others. You control what information is visible through privacy settings in your profile.",
        },
      ],
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      icon: HelpCircle,
      questions: [
        {
          question: "My wallet won't connect. What should I do?",
          answer:
            "Ensure your wallet extension is installed and unlocked, you're on the correct network, and try refreshing the page. If issues persist, try connecting with a different wallet or contact support.",
        },
        {
          question: "My transactions aren't showing up in HashFi",
          answer:
            "Transaction data may take a few minutes to sync. If transactions are still missing after 10 minutes, try refreshing your data or disconnecting and reconnecting your wallet.",
        },
        {
          question: "Why is my reputation score not updating?",
          answer:
            "Reputation scores are updated periodically as new transaction data is processed. Significant changes may take 24-48 hours to reflect. Ensure your recent activities are with supported protocols.",
        },
        {
          question: "I'm seeing incorrect data in my profile",
          answer:
            "If you notice incorrect data, try refreshing your profile data first. If the issue persists, please contact support with specific details about the incorrect information.",
        },
      ],
    },
  ]

  const helpResources = [
    {
      title: "Documentation",
      description: "Comprehensive guides and API documentation",
      icon: FileText,
      link: "#",
      external: true,
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides for common tasks",
      icon: Video,
      link: "#",
      external: true,
    },
    {
      title: "Community Discord",
      description: "Join our community for discussions and support",
      icon: MessageCircle,
      link: "#",
      external: true,
    },
    {
      title: "Developer Resources",
      description: "Tools and resources for developers",
      icon: Globe,
      link: "#",
      external: true,
    },
  ]

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", contactForm)
    // Reset form
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
      category: "general",
    })
  }

  const filteredFAQs = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Help Center
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Find answers to common questions, browse our documentation, or get in touch with our support team
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </div>

        <Tabs defaultValue="faq" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-8">
            {searchQuery ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Search Results</h2>
                {filteredFAQs.length > 0 ? (
                  filteredFAQs.map((category) => (
                    <Card key={category.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <category.icon className="h-5 w-5" />
                          {category.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible>
                          {category.questions.map((faq, index) => (
                            <AccordionItem key={index} value={`${category.id}-${index}`}>
                              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="text-center py-12">
                      <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No results found</h3>
                      <p className="text-muted-foreground">Try different keywords or browse our FAQ categories below</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqCategories.map((category) => (
                  <Card key={category.id} className="hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <category.icon className="h-5 w-5" />
                        {category.title}
                      </CardTitle>
                      <CardDescription>{category.questions.length} articles</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible>
                        {category.questions.slice(0, 3).map((faq, index) => (
                          <AccordionItem key={index} value={`${category.id}-${index}`}>
                            <AccordionTrigger className="text-left text-sm">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-sm">{faq.answer}</AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                      {category.questions.length > 3 && (
                        <Button variant="ghost" className="w-full mt-4">
                          View all {category.questions.length} articles
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="resources" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Additional Resources</h2>
              <p className="text-muted-foreground">Explore our comprehensive resources to get the most out of HashFi</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {helpResources.map((resource, index) => (
                <Card key={index} className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                        <resource.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{resource.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
                        <Button variant="outline" className="w-full bg-transparent">
                          Access Resource
                          {resource.external && <ExternalLink className="h-4 w-4 ml-2" />}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-8">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Contact Support</h2>
                <p className="text-muted-foreground">
                  Can't find what you're looking for? Get in touch with our support team
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Send us a message
                  </CardTitle>
                  <CardDescription>We'll get back to you within 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, subject: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                        placeholder="Describe your issue or question in detail..."
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Alternative Contact Methods */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <MessageCircle className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Live Chat</h3>
                    <p className="text-sm text-muted-foreground mb-4">Chat with our support team in real-time</p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Start Chat
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Headphones className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Community</h3>
                    <p className="text-sm text-muted-foreground mb-4">Join our Discord community for peer support</p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Join Discord
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
