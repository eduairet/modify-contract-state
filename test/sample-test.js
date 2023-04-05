// import testing libraries: https://www.chaijs.com/guide/styles/
const ethers = require('hardhat').ethers;
const { assert } = require('chai');

// the `describe` scope encapsulates an entire test called `TestModifyVariable`
// the `it` says the behavior that should be expected from the test
describe('TestModifyVariable', function () {
    let contract;
    it('Should change x to 1337', async function () {
        contract = await contractInstance('ModifyVariable', 10);
        // modify x from 10 to 1337 via this function!
        await contract.modifyToLeet();
        // getter for state variable x
        const newX = await contract.x();
        assert.equal(newX.toNumber(), 1337);
    });
    it("It shouldn't process a second call", async function () {
        try {
            await contract.modifyToLeet();
        } catch (err) {
            assert.include(err.message, 'x is already 1337');
        }
    });
    it("Should throw an error when it's started with 1377", async function () {
        const contract = await contractInstance('ModifyVariable', 1377);
        // Try to modify x!
        try {
            await contract.modifyToLeet();
        } catch (err) {
            assert.equal(err.message, 'x is already 1337');
        }
    });
});

async function contractInstance(contractName, x) {
    // this line creates an ethers ContractFactory abstraction: https://docs.ethers.org/v5/api/contract/contract-factory/
    const Contract = await ethers.getContractFactory(contractName);
    const contract = await Contract.deploy(x);
    await contract.deployed();
    return contract;
}
