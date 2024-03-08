// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract KipMock is ERC20 {
    uint256 constant INITIAL_SUPPLY = 2_000_000;
    uint constant DECIMALS = 10 ** 6;
    uint counter;

    event counterUpdated(uint counter);

    constructor() ERC20("testKIP", "KIP") {}

    function mint() public {
        _mint(msg.sender, INITIAL_SUPPLY * DECIMALS);
    }

    function mintForOthers(address wallet) public {
        _mint(wallet, INITIAL_SUPPLY * DECIMALS);
    }

    function execute() public {
        counter++;
        emit counterUpdated(counter);
    }
}

// every one will get 2_000_000 of token when contract deployed.
