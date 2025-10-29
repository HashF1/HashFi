import React, { useState } from "react";
import { ethers } from "ethers";
import YieldPassportABI from "../contracts/yieldpassport.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

export default function ConnectWallet({ onContractConnected }) {
  const [walletAddress, setWalletAddress] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);

  // Connect wallet (MetaMask or HashPack)
  const connectWallet = async (walletId) => {
    try {
      let provider;

      if (walletId === "metamask") {
        if (!window.ethereum) {
          alert("Please install MetaMask to continue");
          return;
        }
        provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
      } else if (walletId === "hashpack") {
        if (!window.hashpack) {
          alert("Please install HashPack to continue");
          return;
        }
        provider = new ethers.BrowserProvider(window.hashpack);
        await provider.send("eth_requestAccounts", []);
      } else {
        alert("Unsupported wallet");
        return;
      }

      setSelectedWallet(walletId);

      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      setConnectionStatus(true);

      // Create contract instance with signer
      const contract = new ethers.Contract(CONTRACT_ADDRESS, YieldPassportABI, signer);

      // Pass contract to parent
      if (onContractConnected) onContractConnected(contract);

    } catch (error) {
      console.error("Wallet connection failed:", error);
      alert("Failed to connect wallet. Check console for details.");
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setWalletAddress(null);
    setConnectionStatus(false);
    setSelectedWallet(null);

    // Reset contract in parent
    if (onContractConnected) onContractConnected(null);
  };

  return (
    <div className="flex flex-col gap-3">
      {walletAddress ? (
        <div className="flex flex-col gap-2">
          <p className="text-green-600 font-medium">
            Connected ({selectedWallet}): {walletAddress}
          </p>
          <button
            onClick={disconnectWallet}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={() => connectWallet("metamask")}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
          >
            Connect MetaMask
          </button>
          <button
            onClick={() => connectWallet("hashpack")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Connect HashPack
          </button>
        </div>
      )}
    </div>
  );
}
