"use strict";

require("@nomicfoundation/hardhat-toolbox");

require("hardhat-gas-reporter");

var ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
var ALCHEMY_URL = process.env.ALCHEMY_URL;
var GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        runs: 200,
        enabled: true,
        details: {
          yul: true
        }
      },
      viaIR: true
    }
  },
  networks: {
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/ZClAXvVNcrmcMEr6rCqIvG9qvB7XA8aj",
      accounts: ["a0d972c4ef02269559e99ef02dbce2a9781e38bf4c309fe7407cee6317f4ea33"]
    }
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 1,
    enabled: true,
    coinmarketcap: "7698f5f0-faaa-4fed-822d-b537c47142a9",
    network: "polygon"
  }
};