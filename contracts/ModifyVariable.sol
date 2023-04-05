//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ModifyVariable {
    uint public x;

    constructor(uint _x) {
        x = _x;
    }

    function modifyToLeet() public {
        require(x != 1337, "x is already 1337");
        x = 1337;
    }
}
