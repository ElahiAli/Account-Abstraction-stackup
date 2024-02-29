const hre = require("hardhat");

// manual nonce only for test
// for deploying different smart account nonce must be increased
const FACTORY_NONCE = 1;

// AcountFactory address in localhost
const FACTORY_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// EntryPoint contract address in localhost
const EP_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

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
