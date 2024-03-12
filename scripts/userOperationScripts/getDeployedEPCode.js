const hre = require("hardhat");

const EntryPointContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
async function main() {
    const EPCode = await hre.ethers.provider.getCode(EntryPointContractAddress);

    console.log(EPCode);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// hh run scripts/getDeployedEPCode.js --network localhost
// getting the deployed contract bytecode
