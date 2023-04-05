require('@nomiclabs/hardhat-ethers');
require('dotenv').config();
const { SEPOLIA_URL, PRIV_KEY } = process.env;

module.exports = {
    solidity: '0.8.4',
    networks: {
        sepolia: {
            url: SEPOLIA_URL,
            accounts: [PRIV_KEY],
        },
    },
};
