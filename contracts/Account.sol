// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

// import "hardhat/console.sol";
import "@account-abstraction/contracts/core/EntryPoint.sol";
import "@account-abstraction/contracts/interfaces/IAccount.sol";

contract Account is IAccount {
    uint public count;
    address public owner;

    constructor(address _owener) {
        owner = _owener;
    }

    // allowing all user to use user ops against AA
    // every user ops is a valid user ops right now.
    function validateUserOp(
        UserOperation calldata,
        bytes32,
        uint256
    ) external pure returns (uint256 validationData) {
        return 0;
    }

    function execute() external {
        count++;
    }
}

contract AccountFactory {
    function createAccount(address owner) external returns (address) {
        Account acc = new Account(owner);
        return address(acc);
    }
}
