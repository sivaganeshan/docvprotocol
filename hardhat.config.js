/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-waffle");

const HARDHAT_RPC_URL = 'http://127.0.0.1:8545'
const HARDHAT_ADMIN_ACCOUNT_PRIVATE_KEY = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';


module.exports = {
  solidity: "0.8.4",
  paths: {
    sources: "./contracts",
  },
  networks: {
    local: {
      url: HARDHAT_RPC_URL,
      accounts: [HARDHAT_ADMIN_ACCOUNT_PRIVATE_KEY]
    },
    // rinkeby: {
    //   url: "https://eth-rinkeby.alchemyapi.io/v2/123abc123abc123abc123abc123abcde",
    //   accounts: [privateKey1, privateKey2, ...]
    // }
  }
 
};
