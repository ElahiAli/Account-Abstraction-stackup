// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AccountAbstraction {
IERC20 kipToken;
address private poolContractAddress;

    mapping(address => uint) private s_userEscrowedToken;

    constructor(address _poolContractAddress, address _tokenAddress) {
        poolContractAddress = _poolContractAddress;
        kipToken = IERC20(_tokenAddress);
    }

    //token must be transferred to pool contract
    function escrowedTokens(uint amount) public {
        kipToken.transferFrom(msg.sender, poolContractAddress, amount);
    }

    function withdraw() public {
        uint remainApprovedToken = userApprovedTokensBalance();
        kipToken.transferFrom(msg.sender, msg.sender, remainApprovedToken);
    }

    /** Getter functions */

    function userApprovedTokensBalance() public view returns (uint) {
        uint allowanceAmount = kipToken.allowance(msg.sender, address(this));
        return allowanceAmount;
    }

    function getPoolContractBalance() public view returns (uint balance) {
        return kipToken.balanceOf(poolContractAddress);
    }

    function getAccountAbstractionBalance() public view returns (uint balance) {
        return kipToken.balanceOf(address(this));
    }

}
