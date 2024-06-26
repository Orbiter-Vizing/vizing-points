import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import { config as dotenvConfig } from "dotenv";
import { ethers } from "ethers";
import { HardhatUserConfig } from "hardhat/config";
import type {
  NetworkUserConfig,
  HardhatNetworkAccountsUserConfig,
} from "hardhat/types";
import { resolve } from "path";

const DEFAULT_MNEMONIC =
  "here is where your twelve words mnemonic should be put my friend";

const dotenvConfigPath: string = process.env.DOTENV_CONFIG_PATH || "./.env";
dotenvConfig({ path: resolve(__dirname, dotenvConfigPath) });

// Ensure that we have all the environment variables we need.
const mnemonic: string | undefined = process.env.MNEMONIC || DEFAULT_MNEMONIC;
if (!mnemonic) {
  throw new Error("Please set your MNEMONIC in a .env file");
}

const infuraApiKey: string | undefined = process.env.INFURA_API_KEY;
if (!infuraApiKey) {
  throw new Error("Please set your INFURA_API_KEY in a .env file");
}

export const chainIds = {
  "arbitrum-mainnet": 42161,
  "arbitrum-goerli": 421613,
  "zksync-era-testnet": 280,
  avalanche: 43114,
  bsc: 56,
  hardhat: 31337,
  mainnet: 1,
  "optimism-mainnet": 10,
  "optimism-goerli": 420,
  "polygon-mainnet": 137,
  "polygon-mumbai": 80001,
  sepolia: 11155111,
  "arbitrum-sepolia": 421614,
  "base-sepolia": 84532,
  goerli: 5,
  ganache: 1337,
  localhost: 313371,
  "vizing-testnet": 28516,
  "vizing-mainnet": 28518,
};

const accountsBalance = ethers.parseEther("100") + "";
const privateKeys = (process.env["PRIVATE_KEYS"] || "")
  .split(",")
  .map((item) => item.trim())
  .filter((item) => item != "");
const accounts: HardhatNetworkAccountsUserConfig =
  privateKeys.length == 0
    ? {
        count: 20,
        mnemonic,
        path: "m/44'/60'/0'/0",
        accountsBalance,
      }
    : privateKeys.map((item) => ({
        privateKey: item,
        balance: accountsBalance,
      }));

function getChainConfig(chain: keyof typeof chainIds): NetworkUserConfig {
  let jsonRpcUrl: string;
  switch (chain) {
    case "avalanche":
      jsonRpcUrl = "https://api.avax.network/ext/bc/C/rpc";
      break;
    case "bsc":
      jsonRpcUrl = "https://bsc-dataseed1.binance.org";
      break;
    case "arbitrum-goerli":
      jsonRpcUrl = "https://endpoints.omniatech.io/v1/arbitrum/goerli/public";
      break;
    case "optimism-goerli":
      jsonRpcUrl = "https://optimism-goerli.public.blastapi.io";
      break;
    case "zksync-era-testnet":
      jsonRpcUrl = "https://testnet.era.zksync.dev";
      break;
    case "ganache":
      jsonRpcUrl = "http://127.0.0.1:7545";
      break;
    case "localhost":
      jsonRpcUrl = "http://127.0.0.1:8545";
      break;
    case "arbitrum-sepolia":
      jsonRpcUrl = "https://sepolia-rollup.arbitrum.io/rpc";
      break;
    case "base-sepolia":
      jsonRpcUrl = "https://rpc.notadegen.com/base/sepolia";
      break;
    case "vizing-testnet":
      jsonRpcUrl = "https://rpc-sepolia.vizing.com";
      break;
    case "vizing-mainnet":
      jsonRpcUrl = "https://rpc.vizing.com";
      break;
    default:
      jsonRpcUrl = "https://" + chain + ".infura.io/v3/" + infuraApiKey;
  }
  return {
    accounts:
      accounts instanceof Array
        ? (accounts.map((item) => item.privateKey) as any)
        : accounts,
    chainId: chainIds[chain],
    url: jsonRpcUrl,
  };
}

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",

  etherscan: {
    apiKey: {
      arbitrumOne: process.env.ARBISCAN_API_KEY || "",
      avalanche: process.env.SNOWTRACE_API_KEY || "",
      bsc: process.env.BSCSCAN_API_KEY || "",
      mainnet: process.env.ETHERSCAN_API_KEY || "",
      optimisticEthereum: process.env.OPTIMISM_API_KEY || "",
      polygon: process.env.POLYGONSCAN_API_KEY || "",
      polygonMumbai: process.env.POLYGONSCAN_API_KEY || "",
      sepolia: process.env.ETHERSCAN_API_KEY || "",
      goerli: process.env.ETHERSCAN_API_KEY || "",
      arbitrumSepolia: process.env.ARBISCAN_API_KEY || "",
    },
  },

  gasReporter: {
    currency: "USD",
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    // coinmarketcap: process.env.COINMARKETCAP_KEY,
    src: "./contracts",
    outputFile: "./gas_report.md",
    noColors: true,
  },

  networks: {
    hardhat: {
      hardfork: "cancun",
      accounts,
      chainId: chainIds.hardhat,
    },
    arbitrum: getChainConfig("arbitrum-mainnet"),
    avalanche: getChainConfig("avalanche"),
    bsc: getChainConfig("bsc"),
    mainnet: getChainConfig("mainnet"),
    optimism: getChainConfig("optimism-mainnet"),
    "polygon-mainnet": getChainConfig("polygon-mainnet"),
    "polygon-mumbai": getChainConfig("polygon-mumbai"),
    sepolia: getChainConfig("sepolia"),
    goerli: getChainConfig("goerli"),
    "arbitrum-goerli": getChainConfig("arbitrum-goerli"),
    "optimism-goerli": getChainConfig("optimism-goerli"),
    "zksync-era-goerli": getChainConfig("zksync-era-testnet"),
    ganache: getChainConfig("ganache"),
    "arbitrum-sepolia": getChainConfig("arbitrum-sepolia"),
    "base-sepolia": getChainConfig("base-sepolia"),
    "vizing-testnet": getChainConfig("vizing-testnet"),
    "vizing-mainnet": getChainConfig("vizing-mainnet"),
  },

  solidity: {
    compilers: [
      {
        version: "0.8.23",
        settings: {
          metadata: {
            // Not including the metadata hash
            // https://github.com/paulrberg/hardhat-template/issues/31
            bytecodeHash: "none",
          },
          // Disable the optimizer when debugging
          // https://hardhat.org/hardhat-network/#solidity-optimizer-support
          optimizer: {
            enabled: true,
            runs: 99999,
          },
          viaIR: false,
        },
      },
    ],
  },
};

export default config;
