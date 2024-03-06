// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IPool {
    function setOwnerTokenShare(address ownerAddress, uint kipTokenAmount) external;

    function withdraw() external;

    function getPoolBalance() external view returns (uint);

    function getKipTokenAddress() external view returns (address);

    function getOwnerBalance(address ownerAddress) external view returns (uint);
}
