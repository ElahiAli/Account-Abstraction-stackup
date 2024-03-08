require("@nomicfoundation/hardhat-toolbox");
// require("@nomiclabs/hardhat-waffle");
// require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
// require("solidity-coverage");
// require("hardhat-gas-reporter");
// require("hardhat-contract-sizer");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "Your etherscan API key";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey";
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const MUMBAi_RPC_URL = process.env.MUMBAI_RPC_URL;

module.exports = {
    solidity: {
        version: "0.8.19",
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000,
            },
        },
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            blockConfirmations: 1,
        },
        localhost: {
            chainId: 31337,
            url: "http://127.0.0.1:8545",
        },
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
            blockConfirmations: 6,
        },
        mumbai: {
            url: MUMBAi_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 80001,
            blockConfirmations: 6,
        },
    },
    // gasReporter: {
    //     enabled: false,
    //     currency: "USD",
    //     outputFile: "gas-report.txt",
    //     noColors: true,
    //     // coinmarketcap: COINMARKETCAP_API_KEY,
    // },

    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        },
        player: {
            default: 1,
        },
    },
    // mocha: 200000, //200 seconds max
};

// GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "https://eth-goerli";
// PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey";
// const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key";
// const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key";
