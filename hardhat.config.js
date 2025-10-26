require("dotenv").config();
require("@nomiclabs/hardhat-ethers");       // ethers.js support
require("@nomiclabs/hardhat-waffle");       // chai matchers and testing
require("solidity-coverage");               // coverage support

module.exports = {
  solidity: {
    version: "0.8.30",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "hedera_testnet",
  networks: {
    hedera_testnet: {
      url: process.env.HEDERA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    hardhat: {
      chainId: 1337, // for local tests
    },
  },
};
