<img src="logo_n_bg.png" alt="HashFI Logo" width="100" class="center"/>

# HashFi – Decentralized On-Chain Reputation Protocol
**Track:** Onchain Finance & Real-World Assets
  
HashFi is a decentralized **on-chain reputation protocol** built on Hedera Hashgraph. It introduces the **Yield Passport**, a smart reputation score that helps users and protocols build trust in DeFi by combining behavioral, financial, and risk-based metrics.

# Hedera Integration Summary
**1- Hedera Smart Contracts (HSCS)**

We deployed the core logic of HashFi as a **Solidity smart contract** on **Hedera Smart Contract Service (HSCS).**
This enables **transparent**, **immutable**, and **verifiable** reputation scoring directly on-chain.

We chose HSCS because it provides:

• **Predictable low fees** (~$0.001 per transaction) ensuring scalability and sustainability.

• **High throughput** and **finality within seconds**, which is essential for updating user scores in real-time.

• **EVM compatibility**, allowing us to reuse familiar Solidity tools and libraries.

**Transaction Types Executed:**

  • ContractCreateTransaction :Deploy the main HashFi smart contract.

  • ContractExecuteTransaction :Update or calculate user reputation scores.

  • ContractCallQuery :Retrieve and display scores in the frontend dashboard.


 **2- Hedera Mirror Nodes**
 
The HashFi frontend and backend use **Mirror Node APIs** to fetch **verified on-chain data** for display and analytics.
We chose Mirror Nodes because they offer:
# Features
🔹**On-chain reputation score** : Evaluates user wallets based on activity, consistency, and risk.

🔹**Yield Passport for wallets & protocols** : A DeFi trust identity that can be used across protocols.

🔹**Transparent scoring (0–1000)** : Combines behavioral, financial, and risk data.

🔹**Built on Hedera** : Fast, secure, and low-fee blockchain network.

🔹**Interoperable Design** : The system architecture can be extended to other blockchains.


# Tech Stack
HashFi combines **Web3**, **DeFi analytics**, and **Hedera Hashgraph** technologies.

▹**Hedera Hashgraph** : High-speed, low-fee DLT used for score recording and validation.

▹**Smart Contracts** : Core logic for the Yield Passport and reputation scoring. 

▹**React.js** : Fast UI layer for interaction with on-chain data.

▹**HashConnect + Ethers.js** : Wallet connection and smart contract communication.

▹**Recharts / Chart.js** : Data representation of wallet and score analytics.

# Getting Started 

**Installation**

  1.Clone the repository:
    
    git clone https://github.com/HashF1/HashFi.git
    cd HashFi
    
  2.Install dependencies:
  
    npm install
    
  3.Run the frontend
  
    npm run dev



    
# Configuration

Create a **.env** file in the project root:

    VITE_HEDERA_NETWORK=testnet
    VITE_CONTRACT_ADDRESS=0x12...
    VITE_API_KEY=...




# Links & Resources
Web Link:[https://v0-help-with-vercel-rho-red.vercel.app/]

Demo Video:[https://www.youtube.com/watch?v=WW93X8prpvE]

Pitch Deck:[https://drive.google.com/file/d/1oF35cmGQYrkG4zCnY5GuTXxxQC1zzhA1/view]
