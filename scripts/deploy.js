const ethers = require('ethers');
require('dotenv').config();
const { SEPOLIA_URL, PRIV_KEY } = process.env;

async function main() {
    const [url, privKey] = [SEPOLIA_URL, PRIV_KEY];
    const provider = new ethers.providers.JsonRpcProvider(url),
        signer = new ethers.Wallet(privKey, provider),
        { abi, bytecode } = await hre.artifacts.readArtifact('ModifyVariable'),
        ModifyVariable = new ethers.ContractFactory(abi, bytecode, signer),
        modifyVariable = await ModifyVariable.deploy(10);
    await modifyVariable.deployed();
    console.log(`ModifyVariable address: ${modifyVariable.address}`);
    console.log(
        `https://sepolia.etherscan.io/address/${modifyVariable.address}`
    );
}

main()
    .then(() => process.exit(0))
    .catch(err => {
        console.log(err);
        process.exit(1);
    });
