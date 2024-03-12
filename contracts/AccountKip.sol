// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IPool.sol";

contract AccountAbstraction {
    IERC20 kipToken;
    address private poolContractAddress;
    IPool poolContract;
    // address public immutable APP_OWNER_ADDRESS;
    // address public immutable Model_OWNER_ADDRESS;
    // address public immutable DATASET_OWNER_ADDRESS;
    // uint public APP_SHARE = 50;
    // uint public MODEL_SHARE = 30;
    // uint public DATASET_SHARE = 20;

    mapping(address => uint) private s_userEscrowedToken;

    constructor(
        address _poolContractAddress,
        address _tokenAddress // address _appOwner,
    ) // address _modelOwner,
    // address _dataOwner
    {
        poolContractAddress = _poolContractAddress;
        // poolContract = IPool(poolContractAddress);
        kipToken = IERC20(_tokenAddress);
        // APP_OWNER_ADDRESS = _appOwner;
        // Model_OWNER_ADDRESS = _modelOwner;
        // DATASET_OWNER_ADDRESS = _dataOwner;
    }

    //token must be transferred to pool contract
    function escrowedTokens(uint amount) public {
        kipToken.transferFrom(msg.sender, poolContractAddress, amount);
        // amount = amount * 10 ** 6;
        // poolContract.setOwnerTokenShare(APP_OWNER_ADDRESS, ((amount * APP_SHARE) / 100) / 10 ** 6);
        // poolContract.setOwnerTokenShare(
        //     Model_OWNER_ADDRESS,
        //     ((amount * MODEL_SHARE) / 100) / 10 ** 6
        // );
        // poolContract.setOwnerTokenShare(
        //     APP_OWNER_ADDRESS,
        //     ((amount * DATASET_SHARE) / 100) / 10 ** 6
        // );
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

// contract address on mumbai
// 0xE90116418c24817C649046075F745525C12b3daA
