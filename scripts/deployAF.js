const hre = require("hardhat");

async function main() {
    const afContract = await hre.ethers.deployContract("AccountFactory");

    await afContract.waitForDeployment();

    console.log(`deployed to ${afContract.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// hh run scripts/depoyEp.js --network localhost
// deploying contract on localhost

// account factory address: 0x5FbDB2315678afecb367f032d93F642f64180aa3 on localhost
