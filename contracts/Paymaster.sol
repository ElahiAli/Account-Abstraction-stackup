//SPDX-License-Identifier:MIT
pragma solidity ^0.8.19;

import "@account-abstraction/contracts/interfaces/IPaymaster.sol";

contract Paymaster is IPaymaster {
    function validatePaymasterUserOp(
        UserOperation calldata,
        bytes32,
        uint256
    ) external pure returns (bytes memory context, uint256 validationData) {
        // Paymaster server alchemy?
        // 20 bytes: paymaster address
        // timePeriod
        // signature
        // userOp.paymasterAndData

        context = new bytes(0); // we dont send any context
        validationData = 0; // means that signature is valid and we will pay for the gas
    }

    function postOp(PostOpMode mode, bytes calldata context, uint256 actualGasCost) external {}

    fallback() external payable {}

    receive() external payable {}
}
