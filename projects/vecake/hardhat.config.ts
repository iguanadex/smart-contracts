import type { HardhatUserConfig, NetworkUserConfig } from "hardhat/types";
import "@nomiclabs-2.2.2/hardhat-ethers";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-truffle5";
import "hardhat-abi-exporter";
import "hardhat-contract-sizer";
import "solidity-coverage";
import "dotenv/config";
import "@nomicfoundation/hardhat-verify";

const bscTestnet: NetworkUserConfig = {
  url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  chainId: 97,
  accounts: [process.env.KEY_TESTNET!],
};

const etherlinkTestnet: NetworkUserConfig = {
  url: "https://node.ghostnet.etherlink.com",
  chainId: 128123,
  accounts: [process.env.KEY_TESTNET!],
};

const bscMainnet: NetworkUserConfig = {
  url: "https://bsc-dataseed.binance.org/",
  chainId: 56,
  accounts: [process.env.KEY_MAINNET!],
};

const goerli: NetworkUserConfig = {
  url: "https://rpc.ankr.com/eth_goerli",
  chainId: 5,
  accounts: [process.env.KEY_GOERLI!],
};

const eth: NetworkUserConfig = {
  url: "https://eth.llamarpc.com",
  chainId: 1,
  accounts: [process.env.KEY_ETH!],
};

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "etherlinkTestnet",
        chainId: 128123,
        urls: {
          apiURL: "https://testnet-explorer.etherlink.com/api",
          browserURL: "https://testnet-explorer.etherlink.com",
        },
      },
    ],
  },
  networks: {
    hardhat: {},
    ...(process.env.KEY_TESTNET && { bscTestnet }),
    ...(process.env.KEY_TESTNET && { etherlinkTestnet }),
    ...(process.env.KEY_MAINNET && { bscMainnet }),
    ...(process.env.KEY_GOERLI && { goerli }),
    ...(process.env.KEY_ETH && { eth }),
  },
  solidity: {
    compilers: [
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 99999,
          },
        },
      },
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 99999,
          },
        },
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 99999,
          },
        },
      },
    ],
    overrides: {
      "contracts/VECake.sol": {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 9,
          },
        },
      },
      "contracts/test/VECakeTest.sol": {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 9,
          },
        },
      },
    },
  },
  paths: {
    sources: "./contracts/",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config;
