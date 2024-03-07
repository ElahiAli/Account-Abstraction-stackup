// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PoolMock {
    event Pool(address user, address mockPoolContract);

    function poolMock() public {
        emit Pool(msg.sender, address(this));
    }
}
