// import testing libraries: https://www.chaijs.com/guide/styles/
const ethers = require('hardhat').ethers;
const { assert } = require('chai');

// the `describe` scope encapsulates an entire test called `TestModifyVariable`
// the `it` says the behavior that should be expected from the test
describe('TestModifyVariable', function () {
    let contract, contract2;
    const tagName = 'BARTO';
    it('Should change x to 1337', async function () {
        contract = await contractInstance(10);
        // modify x from 10 to 1337 via this function!
        await contract.modifyToLeet(tagName);
        // getter for state variable x
        const newX = await contract.x();
        assert.equal(newX.toNumber(), 1337);
    });
    it("It shouldn't process a second call", async function () {
        try {
            await contract.modifyToLeet('CHANGE');
        } catch (err) {
            assert.include(err.message, 'x is already 1337');
        }
    });
    it('Tag should be BARTO', async function () {
        const tag = await contract.tag();
        assert.equal(tag, tagName);
    });
    it("Should throw an error when it's started with 1377", async function () {
        contract2 = await contractInstance(1377);
        // Try to modify x!
        try {
            await contract.modifyToLeet(tagName);
        } catch (err) {
            assert.include(err.message, 'x is already 1337');
        }
    });
    it('Should have an empty tag', async function () {
        const tag = await contract2.tag();
        assert.equal(tag, '');
    });
});

async function contractInstance(x) {
    // this line creates an ethers ContractFactory abstraction: https://docs.ethers.org/v5/api/contract/contract-factory/
    const Contract = await ethers.getContractFactory('ModifyVariable');
    const contract = await Contract.deploy(x);
    await contract.deployed();
    return contract;
}
