//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ModifyVariable {
    uint public x;
    string public tag;

    constructor(uint _x) {
        x = _x;
        tag = "";
    }

    function modifyToLeet(string calldata _tag) public returns (bool success) {
        success = false;
        require(x != 1337, "x is already 1337");
        x = 1337;
        success = true;
        if (success) tag = _tag;
    }
}
