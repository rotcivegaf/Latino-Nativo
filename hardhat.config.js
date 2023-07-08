require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("dotenv-defaults").config();

require("./deploy/deploy-nativo");

const LACHAIN_RPC_URL = "https://rpc1.mainnet.lachain.network";
const GOERLI_RPC_URL = "https://rpc.ankr.com/eth_goerli";
// test 1
//const KEY_ADMIN = "0xdf6f650bedc59a9e2869279aa7f31e7512dc25fdeec70df244da3e545f023775";
// test 2
const KEY_ADMIN = "0x18fb206f4be20ef5f323aca4c26166a68d7771af0b80e1d0265c77bc8a0a744a";

const ETHERSCAN_KEY = "XJR4KEARCSI98NKYZPEUFKQBXXWYD2W3Q7";

const LACHAIN_EXPLORER_URL = "https://explorer.lachain.network";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [KEY_ADMIN],
      chainId: 5,
    },
    lachain: {
      url: LACHAIN_RPC_URL,
      accounts: [KEY_ADMIN],
      chainId: 274,
    },
  },
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN_KEY,
      lachain: ETHERSCAN_KEY,
    },
    customChains: [
      {
        network: "lachain",
        chainId: 274,
        urls: {
          apiURL: LACHAIN_EXPLORER_URL + "/api",
          browserURL: LACHAIN_EXPLORER_URL,
        },
      },
    ],
  },
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
            details: {
              yulDetails: {
                optimizerSteps: "u",
              },
            },
          },
          viaIR: true,
        },
      },
    ],
  },
  paths: {
    sources: "./src",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 20000,
  },
};
