// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract KipMock is ERC20 {
    uint256 constant INITIAL_SUPPLY = 2_000_000;
    uint constant DECIMALS = 10 ** 6;

    constructor() ERC20("testKIP", "KIP") {
        // minting KipToken for Users (localHost)
        _mint(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 700 * DECIMALS);
        _mint(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, 700 * DECIMALS);
        _mint(0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC, 700 * DECIMALS);
        _mint(0x90F79bf6EB2c4f870365E785982E1f101E93b906, 700 * DECIMALS);
    }
}

// every one will get 2_000_000 of token when contract deployed.
