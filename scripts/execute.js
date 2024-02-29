const hre = require("hardhat");

async function main() {
    // filling with dommy values for now
    userOp = {
        sender, //smart account address
        nonce: initCode,
        callData,
        callGasLimit: 200_000,
        verificationGasLimit: 200_000,
        preVerificationGas: 50_000,
        maxFeePerGas: hre.ethers.parseEther("10", "gwei"),
        maxPriorityFeePerGas: hre.ethers.parseEther("5", "gwei"),
        paymasterAndData: "0x",
        signature: "0x",
    };
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// hh run scripts/depoyEp.js --network localhost
// deploying contract on localhost
