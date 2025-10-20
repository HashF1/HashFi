import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { WalletProvider } from "@/contexts/wallet-context"

export const metadata: Metadata = {
  title: "HashFi - On-Chain Reputation for DeFi Users",
  description:
    "Unlock your decentralized identity, prove your credibility, and maximize DeFi opportunities with a trustless Yield Passport on Hedera Hashgraph.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  )
}
