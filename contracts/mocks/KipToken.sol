// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract KIP is ERC20 {
    uint256 constant INITIAL_SUPPLY = 2_000_000;
    uint constant DECIMALS = 10 ** 18;

    constructor() ERC20("testKIP", "KIP") {}

    function mint() public {
        _mint(msg.sender, INITIAL_SUPPLY * DECIMALS);
    }
}
